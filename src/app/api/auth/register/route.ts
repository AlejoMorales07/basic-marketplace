import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (user) {
      return NextResponse.json({ error: 'Usuario existente' }, { status: 409 })
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await prisma.user.create({ data: { ...data, password: hashedPassword } })

    const { password, ...userWithoutPassword } = newUser

    return NextResponse.json({ message: 'Usuario registrado con éxito', user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.log(error)
    const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor'
    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
