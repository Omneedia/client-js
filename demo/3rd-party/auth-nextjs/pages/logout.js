import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { omneedia } from '../client'
import { useRouter } from 'next/router'

export default function Logout() {
  const router = useRouter()
  omneedia.auth.signOut()
  async function signIn() {
    router.push('/sign-in')
  }
  return (
    <div className={styles.container}>
      <h1>Logout !</h1>
      <br />
      <button onClick={signIn} className="btn btn-primary">
        Sign in again
      </button>
    </div>
  )
}
