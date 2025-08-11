import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const shops = await prisma.shop.findMany()

    return NextResponse.json({ data: shops }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al obtener tiendas' }, { status: 500 })
  }
}
