import Proxy from './Proxy.js';

async function test() {
  var proxy = Proxy.fromLine('http://Riana:Queen@127.0.0.1:10179');
  console.log(JSON.stringify(proxy));

  var proxy = Proxy.fromLine('ho tel:tri vago@255.255.255.255:10179');
  console.log(JSON.stringify(proxy));

  var proxy = Proxy.fromLine('0.0.0.0:22:Queen:!$%&*(');
  console.log(JSON.stringify(proxy));

  var proxy = Proxy.fromLine('0.0.0.0:22:Queen:!#$%&*(##ast:true:false');
  console.log(JSON.stringify(proxy));
}

test();
