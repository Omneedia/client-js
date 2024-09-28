import React, { useEffect, useState } from 'react'
import { Auth, User } from 'auth'

const auth = new Auth() // singleton

const redirectKey = 'sign_in_redirect'

export const AuthContext = React.createContext()

AuthContext.displayName = 'AuthContext'

function setRedirect(redirect) {
  window.sessionStorage.setItem(redirectKey, redirect)
}

function getRedirect() {
  return window.sessionStorage.getItem(redirectKey)
}

function clearRedirect() {
  return window.sessionStorage.removeItem(redirectKey)
}
export function useAuth() {
  const auth = React.useContext(AuthContext)

  if (!auth) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return auth
}

export function AuthProvider(children) {
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [initializing, setInitializing] = useState(true)

  /*
    NOTICE: this is not production ready code!
    just a quick demo of resolving the initial user
  */
  useEffect(() => {
    auth.resolveUser(2000).onAuthStateChanged(user, error) ={
      console.log('auth state changed ', user)
      if (user) {
        setUser(user)
        setError(null)
      } else {
        setUser(null)
        if (error) {
          setError(error)
        }
      }
      setInitializing(false)
    })
  }, [])

  const value = {
    user,
    error,
    auth,
    initializing,
    setRedirect,
    getRedirect,
    clearRedirect,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
