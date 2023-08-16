import { isBrowser } from './util'
import fetch from 'isomorphic-fetch'

export interface TResponse {
  data: undefined | {}
  error: undefined | {}
  statusText: string
  status: BigInteger
}

export default class OmneediaRequest {
  private url: string = ''
  private options?: any
  private ref?: any
  private fetch = fetch
  constructor(ref: any) {
    this.ref = ref
  }
  async get(uri: string, o: any) {
    if (uri.indexOf('://') > -1) var url = `${uri}`
    else var url = `${this.ref.omneediaUrl}${uri}`
    let headers = this.ref.headers()
    if (isBrowser()) {
      if (localStorage.getItem('omneedia.auth.token')) {
        headers.Authorization = 'Bearer ' + localStorage.getItem('omneedia.auth.token')
      }
      headers.redirect_to = window.location.origin + window.location.pathname
    } else {
      // use cookie
    }
    var res = await this.fetch(url, {
      headers: headers,
    })

    var body = await res.json()
    var response = {
      data: null,
      error: null,
      statusText: res.statusText,
      status: res.status,
    }
    if (res.ok) response.data = body
    else response.error = body
    return response
  }
  async delete(uri: string, o: any) {
    let data = []
    if (uri.indexOf('://') > -1) var url = `${uri}`
    else var url = `${this.ref.omneediaUrl}${uri}`

    let headers = this.ref.headers()
    if (isBrowser()) {
      if (localStorage.getItem('omneedia.auth.token')) {
        headers.Authorization = 'Bearer ' + localStorage.getItem('omneedia.auth.token')
      }
      headers.redirect_to = window.location.origin + window.location.pathname
    } else {
      // use cookie
    }

    var res = await this.fetch(url, {
      method: 'DELETE',
      headers: headers,
    })
    try {
      data = await res.json()
    } catch (e) {
      data = []
    }
    return {
      data: data,
      statusText: res.statusText,
      status: res.status,
    }
  }
  async patch(uri: string, o: any) {
    let data = []
    if (uri.indexOf('://') > -1) var url = `${uri}`
    else var url = `${this.ref.omneediaUrl}${uri}`
    let headers = this.ref.headers()
    if (isBrowser()) {
      headers.redirect_to = window.location.origin + window.location.pathname
      if (localStorage.getItem('omneedia.auth.token')) {
        headers.Authorization = 'Bearer ' + localStorage.getItem('omneedia.auth.token')
      }
    } else {
      // use cookie
    }
    var res = await this.fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(o),
    })
    try {
      data = await res.json()
    } catch (e) {
      data = []
    }
    return {
      data: await data,
      statusText: res.statusText,
      status: res.status,
    }
  }
  async put(uri: string, o: any) {
    let data = []
    if (uri.indexOf('://') > -1) var url = `${uri}`
    else var url = `${this.ref.omneediaUrl}${uri}`
    let headers = this.ref.headers()
    if (isBrowser()) {
      headers.redirect_to = window.location.origin + window.location.pathname
      if (localStorage.getItem('omneedia.auth.token')) {
        headers.Authorization = 'Bearer ' + localStorage.getItem('omneedia.auth.token')
      }
    } else {
      // use cookie
    }
    var res = await this.fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(o),
    })
    try {
      data = await res.json()
    } catch (e) {
      data = []
    }
    return {
      data: await data,
      statusText: res.statusText,
      status: res.status,
    }
  }
  async post(uri: string, o: any) {
    let data = []
    if (uri.indexOf('://') > -1) var url = `${uri}`
    else var url = `${this.ref.omneediaUrl}${uri}`
    let headers = this.ref.headers()
    headers.redirect_to = window.location.origin + window.location.pathname
    if (isBrowser()) {
      headers.redirect_to = window.location.origin + window.location.pathname
      if (localStorage.getItem('omneedia.auth.token')) {
        headers.Authorization = 'Bearer ' + localStorage.getItem('omneedia.auth.token')
      }
    } else {
      // use cookie
    }
    var res = await this.fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(o),
    })
    try {
      data = await res.json()
    } catch (e) {
      data = []
    }
    return {
      data: data,
      statusText: res.statusText,
      status: res.status,
    }
  }
}
