import { GoTrueClient } from '@omneedia/auth-js'
import { SupabaseAuthClientOptions } from './types'

export class SupabaseAuthClient extends GoTrueClient {
  constructor(options: SupabaseAuthClientOptions) {
    super(options)
  }
}
