export default class Cookies {
  static set(name, value, config) {
    const opts = {
      source: null,
      path: '/',
      ...config
    }
    if (!opts.source) opts.source = document

    let c = name + "=" + value + ";"
    if (opts.days) {
      const d = new Date
      d.setTime(d.getTime() + 24*60*60*1000*opts.days)
      c += `expires=${d.toGMTString()};`
    }
    if (opts.path) {
      c += `path=${opts.path};`
    }
    (opts.source).cookie = c
  }

  static get(name, config) {
    const opts = {
      source: null,
      ...config
    }
    if (!opts.source) opts.source = document

    const v = (opts.source).cookie && (opts.source).cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : null
  }

  static delete(name, config) {
    const opts = {
      source: null,
      ...config
    }
    if (!opts.source) opts.source = document

    this.set(name, '', {
      days: -1,
      source: opts.source
    })
  }
}