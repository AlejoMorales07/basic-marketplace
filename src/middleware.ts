import withAuth from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const userType = token?.userType
    const path = req.nextUrl.pathname

    if (path.startsWith('/business') && userType !== 'BUSINESS') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (path.startsWith('/client') && userType !== 'CLIENT') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (path.startsWith('/auth') && token) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true
    }
  }
)

export const config = {
  matcher: ['/business/:path*', '/client/:path*', '/auth/:path*']
}
