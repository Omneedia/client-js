import OmneediaAuth from './auth'
import { COOKIE_OPTIONS } from './constants'
import { getCookie, setCookie, deleteCookie } from './cookies'

export default class OmneediaAuthAPI {
  protected auth: OmneediaAuth
  protected cookieOptions = { ...COOKIE_OPTIONS }
  constructor(auth: OmneediaAuth) {
    this.auth = auth
  }
  /**
   * Set/delete the auth cookie based on the AuthChangeEvent.
   * Works for Next.js & Express (requires cookie-parser middleware).
   */
  setAuth(req: any, res: any, body: any) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      res.status(405).end('Method Not Allowed')
    }
    var { event, session } = req.body
    if (!event) event = body.event
    if (!session) session = body.session
    if (!event) throw new Error('Auth event missing!')
    if (event === 'REFRESH_TOKEN') {
      setCookie(req, res, {
        name: this.cookieOptions.name!,
        value: session,
        domain: this.cookieOptions.domain,
        maxAge: this.cookieOptions.lifetime!,
        path: this.cookieOptions.path,
        sameSite: this.cookieOptions.sameSite,
      })
    }
    if (event === 'SIGNED_IN') {
      if (!session) throw new Error('Auth session missing!')
      setCookie(req, res, {
        name: this.cookieOptions.name!,
        value: session.access_token,
        domain: this.cookieOptions.domain,
        maxAge: this.cookieOptions.lifetime!,
        path: this.cookieOptions.path,
        sameSite: this.cookieOptions.sameSite,
      })
    }
    if (event === 'SIGNED_OUT') deleteCookie(req, res, this.cookieOptions.name!)
    res.status(200).json({})
  }
  /**
   * Get user by reading the cookie from the request.
   * Works for Next.js & Express (requires cookie-parser middleware).
   */
  async getUser(req: any): Promise<any> {
    try {
      if (req.cookie) {
        if (!req.cookies) req.cookies = {}
        req.cookies[req.cookie.name] = req.cookie.value
      } else {
        if (!req.cookies)
          throw new Error(
            'Not able to parse cookies! When using Express make sure the cookie-parser middleware is in use!'
          )
        if (!req.cookies[this.cookieOptions.name!]) throw new Error('No cookie found!')
      }
      const token = req.cookies[this.cookieOptions.name!]
      const o = await this.auth.getUser(token)
      return { user: o, data: null, error: null }
    } catch (error) {
      return { user: null, data: null, error }
    }
  }
}
