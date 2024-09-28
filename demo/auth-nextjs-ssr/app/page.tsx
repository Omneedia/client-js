import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Page publique</h1>
      <p>Bienvenue sur la page publique de notre application.</p>
      <Link href="/login">Se connecter</Link>
    </div>
  )
}
