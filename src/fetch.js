import Proxy from '#models/Proxy.js';

export async function makeProxyOpts(fetch, proxy) {
  if (!fetch) throw new Error('1st parameter is fetch function');
  if (typeof(proxy) === 'string') {
    proxy = Proxy.fromLine(proxy);
  } else if (!(proxy instanceof Proxy)) {
    throw new Error('2st parameter should be a string (proxy line, proxy URL) or Proxy');
  }

  const opts = {};
  const isNative = fetch.toString().includes('undici');
  if (isNative) {
   const { ProxyAgent } = await import('undici');
   opts.dispatcher = new ProxyAgent(proxy.uri);
  } else {
   const { HttpsProxyAgent } = await import('https-proxy-agent');
   opts.agent = new HttpsProxyAgent(proxy.uri);
  }

  return opts;
}

