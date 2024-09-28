import { redirect } from 'next/navigation'
import { omneedia } from '../client'
import { cookies } from 'next/headers'

export default async function getAuth() {
  const cookieStore = cookies()
  const req = {
    cookie: cookieStore.get('oa:token'),
  }
  const { user } = await omneedia.auth.api.getUser(req)
  if (!user) return redirect('/sign-in')
}
