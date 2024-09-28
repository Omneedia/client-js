import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Page d'accueil publique</h1>
      <Link href="/login">Se connecter</Link>
      <br />
      <Link href="/secure">Page sécurisée</Link>
    </div>
  );