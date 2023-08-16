export default function Protected() {
  return (
    <div>
      <h1>Protected Page One</h1>
    </div>
  )
}
Protected.requireAuth = true
