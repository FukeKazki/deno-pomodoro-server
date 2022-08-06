#!/usr/bin / env - S deno run--allow - net--allow - read--watch
// import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
// import router from './router.ts'

// const app = new Application();

// app.use((ctx, next) => {
//   ctx.response.headers.set('Access-Control-Allow-Origin', '*')
//   return next()
// })
// app.use(router.routes())
// app.use(router.allowedMethods())

// await app.listen({ port: 8000 });

import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";

const wss = new WebSocketServer(8080);

wss.on("connection", function (ws: WebSocketClient) {
  ws.on("message", function (message: string) {
    console.log(message);
    ws.send(message);
  });
});