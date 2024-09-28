export type Fetch = typeof fetch

export type MailPhoneProps = {
  email: string | null
  phone: string | null
}

export const COOKIE_OPTIONS = {
  name: 'omeedia:token',
  lifetime: 60 * 3600 * 8,
  domain: '',
  path: '/',
  sameSite: 'lax',
}

export type EmailResetProps = {
  email: string
  redirectTo: string
}

export type EmailAuthProps = {
  username: string | null
  password: string | null
}

export type OmneediaClientOptions<SchemaName> = {
  /**
   * The Postgres schema which your tables belong to. Must be on the list of exposed schemas in Supabase. Defaults to `public`.
   */
  db?: {
    schema?: SchemaName
  }

  auth?: {
    /**
     * Automatically refreshes the token for logged-in users. Defaults to true.
     */
    autoRefreshToken?: boolean
    /**
     * Optional key name used for storing tokens in local storage.
     */
    storageKey?: string
    /**
     * Whether to persist a logged-in session to storage. Defaults to true.
     */
    persistSession?: boolean
    /**
     * Detect a session from the URL. Used for OAuth login callbacks. Defaults to true.
     */
    detectSessionInUrl?: boolean
    /**
     * A storage provider. Used to store the logged-in session.
     */
    //storage?: SupabaseAuthClientOptions['storage']
    /**
     * OAuth flow to use - defaults to implicit flow. PKCE is recommended for mobile and server-side applications.
     */
    //flowType?: SupabaseAuthClientOptions['flowType']
    /**
     * If debug messages for authentication client are emitted. Can be used to inspect the behavior of the library.
     */
    //debug?: SupabaseAuthClientOptions['debug']
    /**
     * Provide your own locking mechanism based on the environment. By default no locking is done at this time.
     *
     * @experimental
     */
    //lock?: SupabaseAuthClientOptions['lock']
  }
  /**
   * Options passed to the realtime-js instance
   */
  //realtime?: RealtimeClientOptions
  global?: {
    /**
     * A custom `fetch` implementation.
     */
    fetch?: Fetch
    /**
     * Optional headers for initializing the client.
     */
    headers?: Record<string, string>
  }
  /**
   * Optional function for using a third-party authentication system with
   * Supabase. The function should return an access token or ID token (JWT) by
   * obtaining it from the third-party auth client library. Note that this
   * function may be called concurrently and many times. Use memoization and
   * locking techniques if this is not supported by the client libraries.
   *
   * When set, the `auth` namespace of the Supabase client cannot be used.
   * Create another client if you wish to use Supabase Auth and third-party
   * authentications concurrently in the same application.
   */
  accessToken?: () => Promise<string>
}

export type ProviderPropsConfig = {
  callback: string
}

export type ProviderProps = {
  provider: string | null
  config: ProviderPropsConfig | null
}

export type AuthChangeEvent =
  | 'PASSWORD_RECOVERY'
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'TOKEN_REFRESHED'
  | 'USER_UPDATED'
  | 'USER_DELETED'
  | 'ERROR'

export type PasswordCredentials =
  | {
      /** The user's email address. */
      email: string
      /** The user's password. */
      password: string
      options?: {
        /**
         * A custom data object to store the user's metadata. This maps to the `auth.users.user_metadata` column.
         *
         * The `data` should be a JSON object that includes user-specific info, such as their first and last name.
         */
        data?: object
        /** Verification token received when the user completes the captcha on the site. */
        captchaToken?: string
        redirectTo?: string
      }
    }
  | {
      /** The user's phone number. */
      phone: string
      /** The user's password. */
      password: string
      options?: {
        /**
         * A custom data object to store the user's metadata. This maps to the `auth.users.user_metadata` column.
         *
         * The `data` should be a JSON object that includes user-specific info, such as their first and last name.
         */
        data?: object
        /** Verification token received when the user completes the captcha on the site. */
        captchaToken?: string
      }
    }

export type GenericUpdatableView = GenericTable

export type GenericNonUpdatableView = {
  Row: Record<string, unknown>
}

export type GenericView = GenericUpdatableView | GenericNonUpdatableView

export type GenericTable = {
  Row: Record<string, unknown>
  Insert: Record<string, unknown>
  Update: Record<string, unknown>
}

export type GenericFunction = {
  Args: Record<string, unknown>
  Returns: unknown
}

export type GenericSchema = {
  Tables: Record<string, GenericTable>
  Views: Record<string, GenericView>
  Functions: Record<string, GenericFunction>
}
