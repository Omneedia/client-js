import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { omneedia } from './client'

export async function middleware(req, event) {
  const token = req.headers['Authorization'] // can get the token from localstorage or cookies too
  const user = await omneedia.auth.api.getUser(req)
  if (req.url.indexOf('home') > -1) return NextResponse.next()
  if (user.error) {
    const url = req.nextUrl.clone()
    url.pathname = '/home'
    return Response.redirect(url)
  } else {
    return new Response('Access granted')
  }
}
