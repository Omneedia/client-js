import { omneedia } from '../../client'

export default function handler(req, res) {
  omneedia.auth.api.setAuth(req, res)
}
