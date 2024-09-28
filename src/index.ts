import OmneediaClient from './OmneediaClient'
import { GenericSchema } from './lib/types'
export { OmneediaClient as omneediaClient }
export { OmneediaClient as OmneediaClient }

/**
 * Omneedia Client.
 *
 * An isomorphic Javascript client for interacting with Postgres.
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
  omneediaUrl: string,
  omneediaKey: string,
  options?: any
): OmneediaClient => {
  return new OmneediaClient(omneediaUrl, omneediaKey, options)
}
