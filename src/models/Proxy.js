import { splitProxyStr, parseProxy, parseProxyMeta, proxyToNormalizedString } from '#utils/proxy.js';

export default class Proxy {
  #uri;

  static fromObject(obj = {}) {
    const pr = new Proxy();

    pr.protocol = obj.protocol || 'http';
    if (pr.protocol === 'https') {
      throw new Error('Proxy protocol should be HTTP. For HTTPS use secure = true');
    }
    pr.host = obj.host || '';
    pr.port = obj.port || 8080;
    pr.user = obj.user || '';
    pr.pass = obj.pass || '';
    pr.secure = obj.secure ?? true;

    pr.can_rotate = obj.can_rotate ?? false;
    pr.service = obj.service || '';

    if (obj.uri)
      pr.uri = obj.uri;

    pr.last_check = obj.last_check || null;

    return pr;
  }

  static fromLine(str) {
    const proxy = {};

    str = str.trim();
    if (!str) throw new Error('Wrong proxy - line empty:' + str);

    let { proxyStr, metaStr } = splitProxyStr(str);

    parseProxy(proxy, proxyStr);
    if (metaStr) {
      parseProxyMeta(proxy, metaStr);
    }

    return Proxy.fromObject(proxy);
  }

  toJSON() {
    return {
      uri: this.uri,

      host: this.host,
      port: this.port,
      user: this.user,
      pass: this.pass,
      secure: this.secure,

      can_rotate: this.can_rotate,
      service: this.service,

      last_check: this.last_check,
    };
  }

  get uri() {
    if (this.#uri) return this.#uri;
    this.#uri = proxyToNormalizedString(this);
    return this.#uri;
  }

  set uri(u) {
    this.#uri = u;
  }
}
