export type MailPhoneProps = {
  email: string | null
  phone: string | null
}

export type EmailResetProps = {
  email: string
  redirectTo: string
}

export type EmailAuthProps = {
  username: string | null
  password: string | null
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
