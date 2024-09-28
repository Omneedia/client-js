// app/login/LoginForm.tsx
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result?.error) {
      // Gérer l'erreur ici (par exemple, afficher un message à l'utilisateur)
      console.error(result.error)
    } else {
      router.push('/secure')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom d'utilisateur
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Mot de passe
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Se connecter</button>
    </form>
  )
}
