import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/secure')
  }

  async function login(formData: FormData) {
    'use server'
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/callback/credentials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username, password, callbackUrl: '/secure' }),
    })

    if (response.ok) {
      redirect('/secure')
    } else {
      // Gérer l'erreur ici
      console.error('Échec de la connexion')
    }
  }

  return (
    <form action={login}>
      <label>
        Nom d'utilisateur
        <input name="username" type="text" required />
      </label>
      <label>
        Mot de passe
        <input name="password" type="password" required />
      </label>
      <button type="submit">Se connecter</button>
    </form>
  )
}
