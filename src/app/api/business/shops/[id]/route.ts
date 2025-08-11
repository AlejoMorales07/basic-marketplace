import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
    }

    const { id } = await params
    const productsCount = await prisma.product.count({ where: { shopId: id } })

    if (productsCount > 0) {
      return NextResponse.json({ message: 'No puedes borrar una tienda con productos asociados' }, { status: 400 })
    }
    await prisma.shop.delete({ where: { id } })
    return NextResponse.json({ message: 'Tienda eliminada con exito' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al eliminar tienda' }, { status: 500 })
  }
}
