// app/secure/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import LogoutButton from './LogoutButton'

export default async function Secure() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Page sécurisée</h1>
      <p>Bienvenue, {session.user.email}!</p>
      <p>Votre ID utilisateur est : {session.user.id}</p>
      <LogoutButton />
    </div>
  )
}
