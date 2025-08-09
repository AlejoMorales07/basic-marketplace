import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Record<'email' | 'password', string> | undefined) {
        if (!credentials || !credentials.email || !credentials.password) throw new Error('Credenciales inválidas')
        const { email, password } = credentials

        const user = await prisma.user.findUnique({
          where: { email }
        })

        if (!user) throw new Error('Credenciales inválidas')

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new Error('Credenciales inválidas')

        const { password: _, createdAt: __, updatedAt: ___, ...userData } = user

        return { ...userData }
      }
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
