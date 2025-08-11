import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (user) {
      return NextResponse.json({ message: 'Usuario existente' }, { status: 409 })
    }
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const newUser = await prisma.user.create({ data: { ...data, password: hashedPassword } })

    const { password, ...userWithoutPassword } = newUser

    return NextResponse.json({ message: 'Usuario registrado con éxito', data: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al registrar el usuario' }, { status: 500 })
  }
}
