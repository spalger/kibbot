import SocketIo from 'socket.io'

import { Consumer } from './consumer'

const io = new SocketIo(process.env.PORT || 5432)

io.on('connection', (socket) => {
  const consumer = new Consumer(socket)
  consumer.init()
})
