import bcrypt from 'bcrypt'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from './prisma'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) throw new Error('Credenciales inválidas')
        const { email, password } = credentials

        const user = await prisma.user.findUnique({
          where: { email }
        })

        if (!user) throw new Error('Credenciales inválidas')

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new Error('Credenciales inválidas')

        const userData = {
          id: user.id,
          email: user.email,
          name: `${user.userType === 'CLIENT' ? user.firstName + ' ' + user.lastName : user.businessName}`,
          userType: user.userType
        }
        return userData
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.userType = user.userType
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          userType: token.userType
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  }
}
