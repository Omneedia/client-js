import { createClient } from '../../dist/module/index'

const omneedia = createClient(
  process.env.NEXT_PUBLIC_OMNEEDIA_URL,
  process.env.NEXT_PUBLIC_OMNEEDIA_KEY
)

export { omneedia }
