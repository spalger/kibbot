import SocketIo from 'socket.io-client'

import {
  log,
  logError,
  logDebug,
  getConfig,
  ACTION_IRC_CLIENT_EVENT,
  ACTION_REQUEST_CONSUMER_IDENT,
  ACTION_RECEIVE_CONSUMER_IDENT,
} from 'kibbot_utils'

import { handleIncomingMessage } from './routing'
const socket = new SocketIo(getConfig('connection.url'))

socket.on(ACTION_REQUEST_CONSUMER_IDENT, () => {
  log('initializing our connection consumer')

  socket.emit(ACTION_RECEIVE_CONSUMER_IDENT, {
    nick: getConfig('kibbot.nick'),
    network: getConfig('kibbot.network'),
    realName: getConfig('kibbot.realName'),
    channels: getConfig('kibbot.channels'),
    password: getConfig('kibbot.password'),
    email: getConfig('kibbot.email'),
  })

  socket.on(ACTION_IRC_CLIENT_EVENT, ({ event, args }) => {
    switch (event) {
      case 'message':
        handleIncomingMessage(...args)
        break

      case 'error':
        logError('ERROR:', ...args)
        break

      default:
        logDebug('IGNORING EVENT %j:', event, ...args)
        break
    }
  })
})

socket.on('disconnect', () => {
  log('connection disconnected')
})
