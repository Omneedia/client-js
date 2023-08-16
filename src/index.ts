import OmneediaClient from './OmneediaClient'
export { OmneediaClient }

/**
 * Omneedia Client.
 *
 * An isomorphic Javascript client for interacting with Postgres.
 */

export const createClient = <Any>(
  omneediaUrl: string,
  omneediaKey: string,
  options?: any
): OmneediaClient => {
  return new OmneediaClient(omneediaUrl, omneediaKey, options)
}
