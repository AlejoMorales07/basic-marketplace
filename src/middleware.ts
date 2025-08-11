import withAuth from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const userType = req.nextauth.token?.userType
    const path = req.nextUrl.pathname

    if (path.startsWith('/business') && userType !== 'BUSINESS') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Si es /client y no es CLIENT → redirigir
    if (path.startsWith('/client') && userType !== 'CLIENT') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token // Solo deja pasar si hay token
    }
  }
)

export const config = { matcher: ['/business/:path*', '/client/:path*'] }
