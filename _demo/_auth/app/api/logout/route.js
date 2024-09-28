import { NextResponse } from 'next/server'
import { logout } from '../../../lib/auth'

export async function POST() {
  try {
    await logout()
    const response = NextResponse.json({ success: true })
    response.cookies.set('omneedia:token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    })
    return response
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Logout failed' }, { status: 500 })
  }
}
