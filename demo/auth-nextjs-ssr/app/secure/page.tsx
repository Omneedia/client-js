import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function SecurePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  async function logout() {
    'use server'
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    if (response.ok) {
      redirect('/login')
    } else {
      console.error('Échec de la déconnexion')
    }
  }

  return (
    <div>
      <h1>Page sécurisée</h1>
      <p>Bienvenue, {session.user?.email || 'Utilisateur'}!</p>
      <p>Votre ID utilisateur est : {session.user?.id || 'Non disponible'}</p>
      <form action={logout}>
        <button type="submit">Se déconnecter</button>
      </form>
    </div>
  )
}
