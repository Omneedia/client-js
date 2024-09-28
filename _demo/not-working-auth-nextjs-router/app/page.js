'use client'
import './globals.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { omneedia } from '../client'

export default function App({ Component, pageProps }) {
  //const router = useRouter()
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
  const navStyle = {
    margin: 20,
  }
  const linkStyle = {
    marginRight: 10,
  }
  useEffect(() => {
    omneedia.auth.onAuthStateChange((event, session) => {
      if (event === 'ERROR') {
        return alert(session)
      }
      handleAuthChange(event, session)
      if (event === 'WAITING') {
        return alert('Please reply to your email')
      }
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        router.push('/profile')
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
      }
    })
  }, [])
  const handleAuthChange = async (event, session) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  return (
    <div>
      <nav style={navStyle}>
        <Link className="Linker" href="/">
          Home
        </Link>
        <Link className="Linker" href="/profile">
          Profile
        </Link>
        <Link className="Linker" href="/sign-in">
          Sign In
        </Link>
        <Link className="Linker" href="/protected">
          Protected
        </Link>
        <Link className="Linker" href="/logout">
          Logout
        </Link>
      </nav>
    </div>
  )
}
