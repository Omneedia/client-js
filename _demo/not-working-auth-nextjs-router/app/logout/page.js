'use client'

import { omneedia } from '../../client'
import { redirect } from 'next/navigation'

export default function Logout() {
  async function signIn() {
    omneedia.auth.signOut()
  }
  return (
    <div>
      <h1>Logout !</h1>
      <br />
      <button onClick={signIn} className="btn btn-primary">
        Sign in again
      </button>
    </div>
  )
}
