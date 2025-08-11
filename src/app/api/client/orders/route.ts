import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('No autorizado', { status: 401 })
    }
    const orders = await prisma.order.findMany({
      where: {
        clientId: session.user?.id
      },
      include: {
        product: true,
        shop: true,
        business: true
      }
    })
    return NextResponse.json({ data: orders }, { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Error al obtener los pedidos', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('No autorizado', { status: 401 })
    }

    if (!session.user?.id) {
      return new NextResponse('ID de cliente no encontrado', { status: 400 })
    }

    const { id: productId } = await req.json()

    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    if (!product) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 })
    }

    const shop = await prisma.shop.findUnique({
      where: {
        id: product.shopId
      }
    })

    if (!shop) {
      return NextResponse.json({ message: 'Tienda no encontrada' }, { status: 404 })
    }

    const businessUser = await prisma.user.findUnique({
      where: { id: shop.ownerId }
    })

    if (!businessUser) {
      return NextResponse.json({ message: 'Usuario de negocio no encontrado' }, { status: 404 })
    }

    const order = await prisma.order.create({
      data: {
        productId: product.id,
        shopId: shop.id,
        businessId: businessUser.id,
        clientId: session.user?.id
      }
    })

    return NextResponse.json({ message: 'Pedido creado con éxito', data: order }, { status: 201 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Error al crear el pedido', { status: 500 })
  }
}
