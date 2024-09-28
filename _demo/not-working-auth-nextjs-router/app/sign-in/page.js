'use client'
import { useState } from 'react'
import { omneedia } from '../../client'

export default function SignIn() {
  const styles = {
    container: {
      margin: '96px auto',
    },
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signUp() {
    await omneedia.auth.signUp({
      email: 'totoame@yopmail.com',
      password: 'dreammotion',
    })
  }
  async function signIn() {
    await omneedia.auth.signInWithPassword({
      email: 'toto@yopmail.com',
      password: 'dreammotion',
    })
  }
  async function signInWithGithub() {
    await omneedia.auth.signInWithProvider({
      provider: 'github',
    })
  }
  async function magicLink() {
    await omneedia.auth.signInWithEmail({
      email: 'stephane.zucatti@me.com',
    })
  }
  return (
    <div className={styles.container}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>
      <button onClick={() => signIn()} type="button" className="btn btn-primary">
        Validate
      </button>
      <br />
      <button onClick={() => signInWithGithub()} type="button" className="btn btn-primary">
        Sign in with github
      </button>
      <br />
      <button onClick={() => signUp()} type="button" className="btn btn-primary">
        Sign up
      </button>
      <br />
      <button onClick={() => magicLink()} type="button" className="btn btn-primary">
        Send magic link
      </button>
    </div>
  )
}
