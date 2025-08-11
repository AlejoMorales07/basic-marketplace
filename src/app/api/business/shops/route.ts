import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
    }

    const shops = await prisma.shop.findMany({
      where: {
        ownerId: session?.user?.id
      }
    })

    return NextResponse.json({ data: shops }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al obtener tiendas' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
    }

    const shop = await req.json()
    const newShop = await prisma.shop.create({
      data: {
        ...shop,
        owner: {
          connect: {
            id: session.user?.id
          }
        }
      }
    })

    return NextResponse.json({ message: 'Tienda creada con éxito', data: newShop }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al crear tienda' }, { status: 500 })
  }
}
