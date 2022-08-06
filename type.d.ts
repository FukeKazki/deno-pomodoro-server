type Room = {
  pin: string
  workingTime: number
  restTime: number
  createdAt: number
  nowWorkingTime: number
  nowRestTime: number
}

type RoomList = { [key: string]: Room }