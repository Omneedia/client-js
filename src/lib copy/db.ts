import OARequest from './request'

export default class OmneediaQueryDB {
  private TABLE: string
  private SELECT: Array<string> = []
  private INSERT: Object = {}
  private UPDATE: Object = {}
  private DELETE: boolean = false
  private WHERE: Array<string> = []
  private ref: any = {}
  private request: any
  private FilterOperator = [
    'eq',
    'neq',
    'gt',
    'gte',
    'lt',
    'lte',
    'like',
    'ilike',
    'is',
    'in',
    'cs',
    'cd',
    'sl',
    'sr',
    'nxl',
    'nxr',
    'adj',
    'ov',
    'fts',
    'plfts',
    'phfts',
    'wfts',
  ]
  constructor(table: string, ref: any) {
    this.TABLE = table
    this.ref = ref
    this.request = new OARequest(this)
  }
  rangeLt(key: string, value: any) {
    this.WHERE.push(`${key}=sl.${value}`)
    return this
  }
  rangeGt(key: string, value: any) {
    this.WHERE.push(`${key}=sr.${value}`)
    return this
  }
  rangeLte(key: string, value: any) {
    this.WHERE.push(`${key}=nxr.${value}`)
    return this
  }
  rangeGte(key: string, value: any) {
    this.WHERE.push(`${key}=nxl.${value}`)
    return this
  }
  rangeAdjacent(key: string, value: any) {
    this.WHERE.push(`${key}=adj.${value}`)
    return this
  }
  overlaps(key: string, value: any) {
    if (!Array.isArray(value)) value = [value]
    value = `[${value.join(',')}]`
    this.WHERE.push(`${key}=ov.${value}`)
    return this
  }
  not(key: string, value: any, o: any) {
    if (this.FilterOperator.indexOf(value) == -1) return this
    this.WHERE.push(`${key}=not.${value}.${o}`)
    return this
  }
  is(key: string, value: any) {
    this.WHERE.push(`${key}=is.${value}`)
    return this
  }
  contains(key: string, value: any) {
    if (!Array.isArray(value)) value = [value]
    value = `{${value.join(',')}}`
    this.WHERE.push(`${key}=cs.${value}`)
    return this
  }
  containedBy(key: any, value: any) {
    if (!Array.isArray(value)) value = [value]
    value = `{${value.join(',')}}`
    this.WHERE.push(`${key}=cd.${value}`)
    return this
  }
  or(key: any) {
    if (!Array.isArray(key)) key = [key]
    if (key.length == 1) key = key[0].split(',')
    this.WHERE.push(`or=(${key.join(',')})`)
    return this
  }
  and(key: any) {
    if (!Array.isArray(key)) key = [key]
    if (key.length == 1) key = key[0].split(',')
    this.WHERE.push(`and=(${key.join(',')})`)
    return this
  }
  textSearch(key: string, value: any, o: any) {
    let typePart = ''
    if (o) {
      if (o.type === 'plain') {
        typePart = 'pl'
      } else if (o.type === 'phrase') {
        typePart = 'ph'
      } else if (o.type === 'websearch') {
        typePart = 'w'
      }
    }
    let method = `${typePart}fts`
    this.WHERE.push(`${key}=${method}.${value}`)
    return this
  }
  in(key: string, value: any) {
    if (!Array.isArray(value)) value = [value]
    value = `(${value.join(',')})`
    this.WHERE.push(`${key}=in.${value}`)
    return this
  }
  nxr(key: string, value: any) {
    if (!Array.isArray(value)) value = [value]
    value = `(${value.join(',')})`
    this.WHERE.push(`${key}=nxr.${value}`)
    return this
  }
  sl(key: string, value: any) {
    if (!Array.isArray(value)) value = [value]
    value = `(${value.join(',')})`
    this.WHERE.push(`${key}=sl.${value}`)
    return this
  }
  adj(key: string, value: any) {
    if (!Array.isArray(value)) value = [value]
    value = `(${value.join(',')})`
    this.WHERE.push(`${key}=adj.${value}`)
    return this
  }
  imatch(key: any) {
    for (var el in key) {
      this.WHERE.push(`${el}=eq.${key[el]}`)
    }
    return this
  }
  match(key: any) {
    for (var el in key) {
      this.WHERE.push(`${el}=eq.${key[el]}`)
    }
    return this
  }
  gt(key: string, value: string) {
    this.WHERE.push(`${key}=gt.${value}`)
    return this
  }
  gte(key: string, value: string) {
    this.WHERE.push(`${key}=gte.${value}`)
    return this
  }
  lt(key: string, value: string) {
    this.WHERE.push(`${key}=lt.${value}`)
    return this
  }
  lte(key: string, value: string) {
    this.WHERE.push(`${key}=lte.${value}`)
    return this
  }
  neq(key: string, value: string) {
    this.WHERE.push(`${key}=neq.${value}`)
    return this
  }
  like(key: string, value: string) {
    this.WHERE.push(`${key}=like.${value}`)
    return this
  }
  ilike(key: string, value: string) {
    this.WHERE.push(`${key}=ilike.${value}`)
    return this
  }
  eq(key: string, value: string) {
    this.WHERE.push(`${key}=eq.${value}`)
    return this
  }
  select(...s: any) {
    if (!s) s = ['']
    if (s.length == 1) s = s[0].split(',')
    this.SELECT = s
    return this
  }
  insert(o: any) {
    this.INSERT = o
    return this
  }
  update(o: any) {
    this.UPDATE = o
    return this
  }
  delete() {
    this.DELETE = true
    return this
  }
  async then(resolve: any, reject: any) {
    var uri = `/${this.TABLE}?`
    if (Object.keys(this.INSERT).length > 0) {
      var url = this.ref.PREFIX.REST + uri
      return resolve(this.request.post(url, this.INSERT))
    }
    if (this.SELECT.length > 0) uri += `select=${this.SELECT.join(',')}&`
    if (this.WHERE.length > 0) uri += this.WHERE.join('&')
    var url = this.ref.PREFIX.REST + uri
    var method = 'get'
    if (this.DELETE === true) method = 'delete'
    if (Object.keys(this.UPDATE).length > 0) {
      resolve(this.request.patch(url, this.UPDATE))
    } else resolve(this.request[method](url))
  }
}
