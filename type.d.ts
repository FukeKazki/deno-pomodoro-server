type Room = {
  pin: string
  workingTime: number
  restTime: number
  intervalTime: number
  intervalCount: number
  createdAt: number
}

type RoomList = { [key: string]: Room }