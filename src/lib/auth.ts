import { parseJwt, getHashParams, isBrowser, uuid, urlBase64Decode } from './util'
import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
import type {
  MailPhoneProps,
  PasswordCredentials,
  ProviderProps,
  EmailResetProps,
} from '../types/types'
import Api from './auth_api'

export default class OmneediaAuth {
  protected ref: any
  protected tokenListener: any = null
  public api: Api
  constructor(ref: any, options?: any) {
    this.ref = ref
    this.api = new Api(this)
    this.tokenListener = setInterval(async () => {
      if (isBrowser()) {
        /** look storage */
        let session = await this.session().getUser()
        if (!session) return
        let refresh = localStorage.getItem('omneedia.auth.refresh_token')
        if (!refresh) {
          localStorage.removeItem('omneedia.auth.token')
          localStorage.removeItem('omneedia.auth.refresh_token')
          return (location.href = `#new_token=${refresh}`)
        }
        let date = new Date(session.exp * 1000)
        if (date < new Date()) {
          let token = await this.getNewToken(refresh)
          if (token === false) {
            localStorage.removeItem('omneedia.auth.token')
            localStorage.removeItem('omneedia.auth.refresh_token')
            return (location.href = `#new_token=${refresh}`)
          }
          localStorage.setItem('omneedia.auth.token', token)
          return (location.href = `#new_token=${refresh}`)
        }
      }
    }, 1000)
  }
  public async getNewToken(refresh_token: string | null): Promise<any> {
    let { data } = await this.ref.request.post(
      this.ref.PREFIX.AUTH + '/token?grant_type=refresh_token',
      {
        refresh_token: refresh_token,
      }
    )
    var response: string | null | boolean
    if (data.err) response = false
    else {
      response = data.access_token
    }
    return response
  }
  public async signInWithPassword(props: PasswordCredentials) {
    let { data } = await this.ref.request.post(
      this.ref.PREFIX.AUTH + '/token?grant_type=password',
      {
        props,
      }
    )
    if (data.err) url = [`#error=${data.err}`]
    else {
      var url = []
      for (var el in data) url.push(`${el}=${data[el]}`)
    }
    location.href = '#' + url.join('&')
  }
  public async signUp(props: PasswordCredentials) {
    let { data } = await this.ref.request.post(this.ref.PREFIX.AUTH + '/signup', {
      props,
    })

    if (data.err) url = [`#error=${data.err}`]
    else {
      var url = []
      for (var el in data) url.push(`${el}=${data[el]}`)
    }
    if (data.waiting) url = [`#waiting`]
    location.href = '#' + url.join('&')
  }
  public async signInWithProvider(props: ProviderProps) {
    // generateId :: Integer -> String
    const generateId = (len?: number) => {
      const dec2hex = (dec: number) => {
        return dec.toString(16).padStart(2, '0')
      }
      var arr = new Uint8Array((len || 40) / 2)
      window.crypto.getRandomValues(arr)
      return Array.from(arr, dec2hex).join('')
    }
    if (props.config?.callback) {
      return (location.href = `${this.ref.URI}${this.ref.PREFIX.AUTH}/authorize?provider=${props.provider}&callback=${props.config.callback}`)
    }
    const platform = await Capacitor.getPlatform()
    const getSession = async (uid: string) => {
      let { data } = await this.ref.request.post(this.ref.PREFIX.AUTH + '/session', {
        sid: uid,
      })
      if (data?.uri) {
        location.hash = data.uri
        Browser.close()
      } else
        setTimeout(() => {
          getSession(uid)
        }, 1000)
    }
    if (platform === 'ios' || platform === 'android') {
      const uid = generateId()
      getSession(uid)
      Browser.open({
        url: `${this.ref.URI}${this.ref.PREFIX.AUTH}/authorize?provider=${props.provider}&sid=${uid}`,
      })
    } else {
      var win = window.open(
        `${this.ref.URI}${this.ref.PREFIX.AUTH}/authorize?provider=${props.provider}`,
        '_blank'
      )
      window.addEventListener(
        'message',
        (event) => {
          return (location.hash = event.data)
        },
        false
      )
    }

    return true
  }
  public async updateUser(props: any) {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) props.token = token
    let { data } = await this.ref.request.put(this.ref.PREFIX.AUTH + '/user', props)
    return data
  }
  public onAuthStateChange(fn: Function) {
    var HashChange = () => {
      if (location.href.indexOf('access_token') > -1) {
        var params = getHashParams()
        window.location.hash = ''
        localStorage.setItem('omneedia.auth.token', params.access_token)
        localStorage.setItem('omneedia.auth.refresh_token', params.refresh_token)
        return fn('SIGNED_IN', params)
      }
      if (location.href.indexOf('#waiting') > -1) {
        window.location.hash = ''
        return fn('WAITING_FOR_CONFIRMATION', {})
      }
      if (location.href.indexOf('#logout') > -1) {
        localStorage.removeItem('omneedia.auth.token')
        localStorage.removeItem('omneedia.auth.refresh_token')
        window.location.hash = ''
        return fn('SIGNED_OUT', {})
      }
      if (location.href.indexOf('#error') > -1) {
        var token = decodeURIComponent(location.href).split('#error=')[1]
        fn('ERROR', token)
        window.location.hash = ''
        return false
      }
      if (location.href.indexOf('#new_token') > -1) {
        var token = decodeURIComponent(location.href).split('#new_token=')[1]
        fn('REFRESH_TOKEN', localStorage.getItem('omneedia.auth.token'))
        window.location.hash = ''
        return false
      }

      if (localStorage.getItem('omneedia.auth.token')) {
        fn('AUTHENTICATED', localStorage.getItem('omneedia.auth.token'))
      }
    }
    window.addEventListener('hashchange', HashChange)
    window.addEventListener('load', HashChange)
  }
  public async resetPasswordForEmail(props: EmailResetProps) {
    let { data } = await this.ref.request.post(this.ref.PREFIX.AUTH + '/recover', props)

    if (data.err) url = [`error=${data.err}`]
    else {
      var url = []
      for (var el in data) url.push(`${el}=${data[el]}`)
    }
    if (data.waiting) url = [`waiting`]
    location.href = '#' + url.join('&')
  }
  public async signInWithEmail(props: MailPhoneProps) {
    let { data } = await this.ref.request.post(this.ref.PREFIX.AUTH + '/magiclink', props)
    if (data.err) url = [`error=${data.err}`]
    else {
      var url = []
      for (var el in data) url.push(`${el}=${data[el]}`)
    }
    if (data.waiting) url = [`waiting`]
    location.href = '#' + url.join('&')
  }
  public getSession(): boolean | any {
    var session = false
    if (localStorage.getItem('omneedia.auth.token')) {
      let token: string | null = localStorage.getItem('omneedia.auth.token')!
      session = parseJwt(token)
    }
    return {
      getUser: (): any => {
        return session
      },
    }
  }
  public session = this.getSession
  public async getUser(token?: string | null) {
    if (token) {
      try {
        token = urlBase64Decode(token)
        return token
      } catch (e) {
        return null
      }
    }
    let { data } = await this.ref.request.get(this.ref.PREFIX.AUTH + '/user')
    if (data === false) {
      localStorage.removeItem('omneedia.auth.token')
      localStorage.removeItem('omneedia.auth.refresh_token')
    }
    return data
  }
  public isAuthenticated() {
    if (isBrowser()) {
      if (window.localStorage.getItem('omneedia.auth.token')) return true
      else return false
    }
  }
  public async signOut() {
    if (isBrowser()) {
      await this.ref.request.get(this.ref.PREFIX.AUTH + '/signout')
      /*location.href =
        this.ref.omneediaUrl +
        this.ref.PREFIX.AUTH +
        '/signout?redirect_to=' +
        location.href +
        '#logout'*/
      location.hash = '#logout'
      return
    } else {
      await this.ref.request.get(this.ref.PREFIX.AUTH + '/signout')
      //location.hash = '#logout'
    }
  }
}
