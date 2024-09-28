import { createBrowserClient } from '@omneedia/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_OMNEEDIA_URL!,
    process.env.NEXT_PUBLIC_OMNEEDIA_ANON_KEY!
  )
