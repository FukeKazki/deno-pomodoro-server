import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { checkTime, createRoom, deleteRoom, getTest, joinRoom, getRoomList, masterTime } from "./controller.ts";

const router = new Router()

router
  .get('/', getTest)
  .get('/create/:workingTime/:restTime', createRoom)
  .get('/rooms', getRoomList)
  .get('/check/:pin', checkTime)
  .get('/delete', deleteRoom)
  .get('/join/:pin', joinRoom)
  .get('/master/:pin/:workingTime/:restTime', masterTime)

export default router
