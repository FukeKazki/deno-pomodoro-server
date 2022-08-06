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
    workingTime: 1500,
    restTime: 300,
    nowWorkingTime: 1500,
    nowRestTime: -1,
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

const checkTime = ({ params, response }: {
  params: { pin: string },
  response: any
}) => {
  const room = roomList.get(params.pin)
  if (room) {
    response.status = 200
    response.body = room
  } else {
    response.status = 404
    response.body = { message: `Roomが閉じました。` }
  }
}

const masterTime = ({ params, response }: {
  params: { pin: string, workingTime: string, restTime: string },
  response: any
}) => {
  const room = roomList.get(params.pin)
  room.nowWorkingTime = Number(params.workingTime)
  room.nowRestTime = Number(params.restTime)
  roomList.set(params.pin, room)
  if (room) {
    response.status = 200
    response.body = room
  } else {
    response.status = 404
    response.body = { message: `Roomが閉じました。` }
  }
}

export { getTest, getRoomList, checkTime, createRoom, deleteRoom, joinRoom, createTask, masterTime }