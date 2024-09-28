import { cookies } from 'next/headers'

const API_URL = process.env.API_URL || 'http://localhost:3000/api'

export async function login(email, password) {
  const response = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grant_type: 'password', email, password }),
  })

  console.log('response', response)

  if (!response.ok) {
    throw new Error('Login failed')
  }

  const data = await response.json()
  return data
}

export async function logout() {
  const response = await fetch(`${API_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }
}

export async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get('omneedia:token')

  if (!token) {
    return null
  }

  const response = await fetch(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token.value}` },
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}
