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
import { generatePIN } from "./util.ts"
const wss = new WebSocketServer(8080);
const roomList = new Map()

wss.on("connection", (ws: WebSocketClient, url: string) => {
  console.info("[Server] conection")

  ws.on("message", function (message: string) {
    console.info("[Client] message")
    switchMessage(message, ws, wss);
  });
  ws.on("open", () => {
    console.info("[Client] oepn")
  })
  ws.on("close", () => {
    console.info("[Client] close")
  })
  ws.on("error", () => {
    console.info("[Client] error")
  })
  ws.on("ping", () => {
    console.info("[Client] ping")
  })
  ws.on("pong", () => {
    console.info("[Client] pong")
  })
});

wss.on("error", (err: unknown) => {
  console.info("[Server] error")
})

const switchMessage = async (message: string, ws: WebSocketClient, wss: WebSocketServer) => {
  if (message.includes("[create]")) {
    const pid = generatePIN()
    roomList.set(pid, {
      clients: [ws],
      workTime: 2500
    })
    return ws.send(`{"pid": ${pid}}`)
  }
  if (message.includes("[join]")) {
    // がんばってpidを抽出
    const pid = ""
    const room = roomList.get(pid)
    room.clients.push(ws)
    roomList.set(pid, room)
    return;
  }
  if (message.includes("[delete]")) {
    // がんばってpidを抽出
    const pid = ""
    const room = roomList.get(pid)
    // ルーム内のソケットを閉じる
    await Promise.all(room.clients.map((client: WebSocketClient) => client.close(0)))
  }
}

// const broadcast = async (wss: WebSocketServer, message: string) => {
//   const clients: Promise<void>[] = []
//   wss.clients.forEach(client => clients.push(client.send(message)))
//   await Promise.all(clients)
// }

const createMessage = `[create] {"work":2500,"rest":300}`
const joinMessage = `[join] {"pid":40000}`
const deleteMessage = `[delete] {"pid":30000}` // bloadcastでクローズする
const leaveMessage = ``

// 1秒ごとに送信し続ける
setInterval(() => {
  if (roomList.size === 0) return;
  roomList.forEach(room => {
    room.clients.map((client: WebSocketClient) => client.send(room.workTime.toString()))
    roomList.set(room.pid, {
      ...room,
      workTime: room.workTime - 1
    })
  })
}, 1000)