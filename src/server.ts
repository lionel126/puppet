const httpProxy = require("http-proxy");
const HOST = "0.0.0.0";
const PORT = 9223;
async function createServer(WSEndPoint:string, host:string=HOST, port:number=PORT) {
  await httpProxy
    .createServer({
      target: WSEndPoint, // where we are connecting
      ws: true,
      localAddress: host // where to bind the proxy
    })
    .listen(port); // which port the proxy should listen to
  return `ws://${host}:${port}`; // ie: ws://123.123.123.123:8080
}

createServer('ws://127.0.0.1:9222/devtools/browser/3c6a93e9-dd9d-49f2-a1c8-d41c6aaa75ae')