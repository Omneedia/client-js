import OmneediaClient from './OmneediaClient'
import type { GenericSchema, OmneediaClientOptions } from './lib/types'

export * from '@omneedia/auth-js'
export type { User as AuthUser, Session as AuthSession } from '@omneedia/auth-js'
export type {
  PostgrestResponse,
  PostgrestSingleResponse,
  PostgrestMaybeSingleResponse,
  PostgrestError,
} from '@omneedia/postgrest-js'
export {
  FunctionsHttpError,
  FunctionsFetchError,
  FunctionsRelayError,
  FunctionsError,
} from '@omneedia/functions-js'
export * from '@omneedia/realtime-js'
export { default as OmneediaClient } from './OmneediaClient'
export type { OmneediaClientOptions } from './lib/types'

/**
 * Creates a new Supabase Client.
 */
export const createClient = <
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database,
  Schema extends GenericSchema = Database[SchemaName] extends GenericSchema
    ? Database[SchemaName]
    : any
>(
  supabaseUrl: string,
  supabaseKey: string,
  options?: OmneediaClientOptions<SchemaName>
): OmneediaClient<Database, SchemaName, Schema> => {
  return new OmneediaClient(supabaseUrl, supabaseKey, options)
}
