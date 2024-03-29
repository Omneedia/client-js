import { useState, useEffect } from 'react'
import { omneedia } from '../client'
import { useRouter } from 'next/router'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const router = useRouter()
  useEffect(() => {
    fetchProfile()
  }, [])
  async function update() {
    const { user, error } = await omneedia.auth.update({
      data: {
        city: 'New York',
      },
    })
    console.log('user:', user)
  }
  async function fetchProfile() {
    const profileData = await omneedia.auth.getUser()
    console.log('profileData: ', profileData)
    if (!profileData) {
      router.push('/sign-in')
    } else {
      setProfile(profileData)
    }
  }
  async function signOut() {
    await omneedia.auth.signOut()
    router.push('/sign-in')
  }
  if (!profile) return null
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <h2>Hello, {profile.email}</h2>
      <p>User ID: {profile.id}</p>
      <button className="margin btn btn-primary" onClick={signOut}>
        Sign Out
      </button>
      <button className="btn btn-primary" onClick={update}>
        Set Attribute
      </button>
    </div>
  )
}
