import getAuth from '../../guard/auth'

export default async function ProtectedPage(req) {
  const auth = await getAuth(req)

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <h1 style={{ fontWeight: 'bold', color: 'red' }}>protected page</h1>
    </div>
  )
}
