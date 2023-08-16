export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const isBrowser = () => typeof document !== 'undefined'

export function getHashParams() {
  let p = location.href.substring(location.href.indexOf('#') + 1, location.href.length)
  let params = p.split('&')
  let response: any = {}
  for (let el in params) {
    response[params[el].split('=')[0]] = params[el].split('=')[1]
  }
  return response
}

export function parseJwt(token: string) {
  if (isBrowser()) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    const now = Math.floor(Date.now() / 1000)
    const exp = JSON.parse(jsonPayload).exp
    if (exp < now) {
      localStorage.removeItem('omneedia.auth.token')
      localStorage.removeItem('omneedia.auth.refresh_token')
      return false
    } else return JSON.parse(jsonPayload)
  } else return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

export function urlBase64Decode(str: string) {
  // From https://jwt.io/js/jwt.js

  let output = str.replace(/-/g, '+').replace(/_/g, '/')
  switch (output.length % 4) {
    case 0:
      break
    case 2:
      output += '=='
      break
    case 3:
      output += '='
      break
    default:
  }

  // polifyll https://github.com/davidchambers/Base64.js
  if (isBrowser()) {
    const result = window.atob(output)
    try {
      return JSON.parse(decodeURIComponent(escape(result)))
    } catch {
      return result
    }
  } else {
    return JSON.parse(Buffer.from(output.split('.')[1], 'base64').toString())
  }
}

export function getHash() {
  if (location.hash == '') return {}
  let newHash: string[] = location.hash.split('&')
  let items: any
  for (let i = 0; i < newHash.length; i++) {
    var key = newHash[i].split('=')[0]
    var value = newHash[i].split('=')[1]
    items[key] = value
  }
  return items
}
