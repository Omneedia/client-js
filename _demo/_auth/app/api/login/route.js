import { NextResponse } from 'next/server'
import { login } from '../../../lib/auth'

export async function POST(request) {
  const { email, password } = await request.json()

  try {
    const data = await login(email, password)
    const response = NextResponse.json({ success: true })
    response.cookies.set('omneedia:token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: data.expires_in,
      path: '/',
    })
    return response
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 401 })
  }
}
