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
import { blue, red, yellow } from "./deps.ts";
import {
  WebSocketClient,
  WebSocketServer,
} from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import { generatePIN } from "./util.ts";

console.info = (...data: unknown[]) => console.log(blue("[INFO] ") + data);

console.warn = (...data: unknown[]) => console.log(yellow("[WARN] ") + data);

console.error = (...data: unknown[]) => console.log(red("[WARN] ") + data);

const wss = new WebSocketServer(8080);
const roomList = new Map();
console.info("infomation");
wss.on("connection", (ws: WebSocketClient, url: string) => {
  ws.on("message", function (message: string) {
    console.info("[Client] message");
    switchMessage(message, ws, wss);
  });
  ws.on("open", () => {
    console.info("[Client] oepn");
  });
  ws.on("close", () => {
    console.info("[Client] close");
  });
  ws.on("error", () => {
    console.info("[Client] error");
  });
  ws.on("ping", () => {
    console.info("[Client] ping");
  });
  ws.on("pong", () => {
    console.info("[Client] pong");
  });
});

wss.on("error", (err: unknown) => {
  console.error("Server error");
});

const switchMessage = async (
  message: string,
  ws: WebSocketClient,
  wss: WebSocketServer,
) => {
  if (message.includes("create")) {
    const res = JSON.parse(message);
    const pid = generatePIN();
    const workTime = res?.workingTime ?? 2500;
    const restTime = res?.restTime ?? 300;
    const room = {
      clients: [ws],
      workTime: workTime,
      restTime: restTime,
    };
    roomList.set(pid, room);
    console.info(`Create ${pid}`);
    return ws.send(`{"message": "create","pid": ${pid}}`);
  }
  if (message.includes("join")) {
    const res = JSON.parse(message);
    const pid = res.pid;
    const room = roomList.get(pid);
    room.clients.push(ws);
    roomList.set(pid, room);
    console.info(`JOIN ${pid}`);
    return;
  }
  if (message.includes("delete")) {
    const res = JSON.parse(message);
    const pid = res.pid;
    const room = roomList.get(pid);

    console.info(`Close ${pid}`);
    await Promise.all(
      room.clients.map((client: WebSocketClient) => client.close(0)),
    );
  }
  if (message.includes("sync")) {
    const res = JSON.parse(message);
    const pid = res.pid.toString();
    const room = roomList.get(pid);

    console.info(`Broadcast ${pid}`);
    await Promise.all(
      room.clients.map((client: WebSocketClient) => client.send(message)),
    );
  }
};

// const broadcast = async (wss: WebSocketServer, message: string) => {
//   const clients: Promise<void>[] = []
//   wss.clients.forEach(client => clients.push(client.send(message)))
//   await Promise.all(clients)
// }

const createMessage = `{"message": "create","work":2500,"rest":300}`;
const joinMessage = `{"message": "jojn","pid":40000}`;
const deleteMessage = `{"message": "delete","pid":30000}`; // bloadcast?????????????????????
const leaveMessage = ``;
const syncMessage = `{"message":"sync","pid":222222,"work":2445,"rest":-1}`;
