import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
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
