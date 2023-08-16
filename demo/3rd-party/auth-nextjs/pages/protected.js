import { omneedia } from '../client'
import styles from '../styles/Home.module.css'

export default function ProtectedPage() {
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <h1 style={{ fontWeight: 'bold', color: 'red' }}>protected page</h1>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user, data, error } = await omneedia.auth.api.getUser(req)
  if (!user) {
    return { props: {}, redirect: { destination: '/sign-in' } }
  }
  return { props: { user } }
}
