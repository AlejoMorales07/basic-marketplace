import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
    }

    const { shopId, ...product } = await req.json()

    const newProduct = await prisma.product.create({
      data: {
        ...product,
        shop: { connect: { id: shopId } }
      }
    })
    return NextResponse.json({ message: 'Producto creado con éxito', data: newProduct }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al crear producto' }, { status: 500 })
  }
}
