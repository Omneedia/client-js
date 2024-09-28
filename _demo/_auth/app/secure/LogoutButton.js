'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const response = await fetch('/api/logout', { method: 'POST' })
    if (response.ok) {
      router.push('/')
    }
  }

  return <button onClick={handleLogout}>Se déconnecter</button>
}
