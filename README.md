# approximation
ESM (in future - CommonJS, JS) library to support proxies easy and quickly.

Installation:

```sh
npm install approximation
yarn add approximation
pnpm add approximation
```

Supported "proxy line" (input string) formats:
- ip:port:russianproxysellerstyle:password
- https://proxyagentstyle:pass@ip:port
- http://proxyagenystyle:pass@ip:port

Proxy line can also include "proxy meta", after `##` separator:
```
##service_name:can_rotate_bool:is_secure_bool
```

Example:

```js
import { Proxy, makeProxyOpts } from 'approximation';
import fetch0 from 'node-fetch';
// makeProxyOpts() also supports Node.js 20+ native Undici Fetch.
// node-fetch -> npm install https-proxy-agent
// native fetch -> npm install undici

const proxy = Proxy.fromLine('ip:port:user:pass');
console.log(proxy, proxy.uri);
let resp = await fetch0('https://api.ipify.org/', {
  ...(await makeProxyOpts(fetch0, proxy)).opts,
});
resp = await resp.text();
console.log(resp);
```

Starting from Node.js 20+, can also be used in CommonJS modules with `require`.
