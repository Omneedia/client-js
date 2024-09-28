import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('omneedia:token')

  if (!token && request.nextUrl.pathname.startsWith('/secure')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/secure/:path*',
}
