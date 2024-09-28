'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { omneedia } from '../client'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const router = useRouter()
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
      //handleAuthChange(event, session)
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
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <div>
          <nav style={navStyle}>
            <Link className="linker" href="/">
              Home
            </Link>
            <Link className="linker" href="/profile">
              Profile
            </Link>
            <Link className="linker" href="/sign-in">
              Sign In
            </Link>
            <Link className="linker" href="/protected">
              Protected
            </Link>
            <Link className="linker" href="/logout">
              Logout
            </Link>
          </nav>
        </div>
        {children}
      </body>
    </html>
  )
}
