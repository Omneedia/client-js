import { omneedia } from '../../../client'
import { cookies, headers } from 'next/headers'

export async function POST(req) {
  const { event, session } = await req.json()

  if (event === 'REFRESH_TOKEN') {
    cookies().set('oa:token', session, { secure: true, httpOnly: true })
  }
  if (event === 'SIGNED_IN') {
    if (!session) throw new Error('Auth session missing!')
    cookies().set('oa:token', session.access_token, { secure: true, httpOnly: true })
  }
  if (event === 'SIGNED_OUT') cookies().delete('oa:token')

  return new Response('set.token', {
    status: 200,
  })
}
