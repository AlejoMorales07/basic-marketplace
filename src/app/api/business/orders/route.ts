import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('No autorizado', { status: 401 })
    }
    const orders = await prisma.order.findMany({
      where: {
        businessId: session.user?.id
      },
      include: {
        product: true,
        shop: true,
        client: true
      }
    })
    return NextResponse.json({ data: orders }, { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse('Error al obtener los pedidos', { status: 500 })
  }
}
