import { getUser } from '../../lib/auth'
import { redirect } from 'next/navigation'
import LogoutButton from './LogoutButton'

export default async function SecurePage() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Page sécurisée</h1>
      <p>Bienvenue, {user.email}</p>
      <p>Contenu accessible uniquement aux utilisateurs authentifiés.</p>
      <LogoutButton />
    </div>
  )
}
