import Server from 'socket.io'
import { getConfig, logDebug, logError } from 'kibbot_utils'

import { Consumer } from './consumer'

const io = new Server(getConfig('connection.port'), { serveClient: false })

io.on('connection', (socket) => {
  logDebug('received connection')
  const consumer = new Consumer(socket)
  consumer.init().catch(err => {
    logError('Failed to initialize consumer\n  ', err.stack)
  })
})
