import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { checkTime, createRoom, deleteRoom, getTest, joinRoom, getRoomList } from "./controller.ts";

const router = new Router()

router
  .get('/', getTest)
  .get('/create', createRoom)
  .get('/rooms', getRoomList)
  .get('/check', checkTime)
  .get('/delete', deleteRoom)
  .get('/join/:pin', joinRoom)

export default router
