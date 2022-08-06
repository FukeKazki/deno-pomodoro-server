import { generatePIN, mapToObject } from "./util.ts";
import type { Room } from "./type.d.ts";

const roomList = new Map<string, Room>()

const getTest = ({ response }: {
  response: any
}) => {
  response.body = 'hello world'
}

const createRoom = ({ response }: {
  response: any
}) => {
  const pin = generatePIN()
  const room = {
    pin,
    workingTime: 25,
    restTime: 5,
    intervalTime: 15,
    intervalCount: 5,
    createdAt: Date.now()
  }
  roomList.set(pin, room)
  response.body = room
}

const getRoomList = ({ response }: {
  response: any
}) => {
  const object = mapToObject(roomList)
  response.body = object
}


const deleteRoom = () => { }

const joinRoom = ({ params, response }: {
  params: { pin: string },
  response: any
}) => {
  console.log(params)
  const room = roomList.get(params.pin)
  if (room) {
    response.status = 200
    response.body = room
  } else {
    response.status = 404
    response.body = { message: `Room not found.` }
  }
}

const createTask = () => { }

// 補正用のAPI
// 現在時刻とcreatedAtの差分を返す
const checkTime = () => { }

export { getTest, getRoomList, checkTime, createRoom, deleteRoom, joinRoom, createTask }