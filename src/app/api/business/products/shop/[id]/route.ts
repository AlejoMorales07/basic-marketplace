import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params

    const products = await prisma.product.findMany({
      where: {
        shopId: id
      }
    })
    return NextResponse.json({ data: products }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al obtener productos' }, { status: 500 })
  }
}
