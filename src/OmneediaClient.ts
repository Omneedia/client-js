import { io } from 'socket.io-client'
import OmneediaQueryDB from './lib/db'
import OmneediaRealtime from './lib/realtime'
import OmneediaAuth from './lib/auth'
import OmneediaRequest from './lib/request'
import prefix from './env/prefix'

export default class OmneediaClient {
  protected PREFIX = prefix

  public auth: OmneediaAuth
  public options: any

  protected KEY: String = ''
  protected URI: String = ''
  protected request: any
  protected socket: any = null

  protected headers() {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + this.KEY,
      apikey: this.KEY,
    }
  }

  constructor(protected omneediaUrl: String, protected omneediaKey: String, options?: any) {
    if (!omneediaUrl) throw new Error('omneediaUrl is required.')
    if (!omneediaKey) throw new Error('omneediaKey is required.')
    this.URI = omneediaUrl
    this.KEY = omneediaKey
    this.request = new OmneediaRequest(this)
    this.auth = new OmneediaAuth(this, options)
    this.options = options
  }

  public from(table: string) {
    return new OmneediaQueryDB(table, this)
  }

  public channel(channel: string) {
    this.socket = io(String(this.URI), {
      path: this.PREFIX.REALTIME,
      withCredentials: true,
      extraHeaders: {
        apikey: `${this.KEY}`,
        Authorization: `Bearer ${this.KEY}`,
      },
    })
    this.socket.on('connect_error', function (e: any) {
      if (e.description == 401) throw `Invalid authentication credentials (401)`
      throw `unhandled exception`
    })
    return new OmneediaRealtime(channel, this)
  }
}
