const scDelim = '://';

export function splitProxyStr(str) {
  const [ proxyStr, metaStr ] = str.split('##');
  return { proxyStr, metaStr };
}

export function parseProxy(proxy, str) {
  const scDelimIdx = str.indexOf(scDelim);
  const hasScheme = scDelimIdx !== -1;
  if (str.includes('@') || hasScheme) {
    if (hasScheme) {
      proxy.protocol = str.substring(0, scDelimIdx);

      if (proxy.protocol === 'https') {
        proxy.protocol = 'http';
        proxy.secure = true;
      }

      str = str.substring(scDelimIdx + scDelim.length);
    }

    const [ main, ...segments ] = str.split('/');

    let [ auth, host ] = main.split('@');
    if (!host) {
      host = auth;
      auth = '';
    }

    if (auth) {
      const [ user, pass ] = auth.split(':');
      proxy.user = user;
      proxy.pass = pass || proxy.pass;
    }

    const [ hostname, port ] = host.split(':');
    proxy.host = hostname;
    proxy.port = port ? parseInt(port) : proxy.port;
    return proxy;
  }

  const [ hostname, port, user, pass ] = str.split(':');
  proxy.host = hostname;
  proxy.port = port ? parseInt(port) : proxy.port;
  proxy.user = user || proxy.user;
  proxy.pass = pass || proxy.pass;
  return proxy;
}

export function parseProxyMeta(proxy, meta) {
  const [ service, can_rotate, secure,  ] = meta.split(':');
  proxy.service = service || '';
  proxy.can_rotate = can_rotate === 'true' ? true : false;
  proxy.secure = secure === 'false' ? false : true;
  return proxy;
}

export function proxyToNormalizedString(proxy) {
  let str = proxy.host + ':' + proxy.port;
  if (proxy.user) {
    let auth = proxy.user;
    if (proxy.pass) {
      auth += ':' + proxy.pass;
    }
    str = auth + '@' + str;
  }
  str = proxy.protocol + scDelim + str;
  return str;
}
