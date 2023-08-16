import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { omneedia } from '../client'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }) => {
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
  async function handleAuthChange(event, session) {
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
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/profile">
          <a style={linkStyle}>Profile</a>
        </Link>
        <Link href="/sign-in">
          <a style={linkStyle}>Sign In</a>
        </Link>
        <Link href="/protected">
          <a style={linkStyle}>Protected</a>
        </Link>
        <Link href="/logout">
          <a style={linkStyle}>Logout</a>
        </Link>
      </nav>

      <Component {...pageProps} />
    </div>
  )
}
export default MyApp
