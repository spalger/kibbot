import IoClient from 'socket.io-client'

import { handleIncomingMessage } from './routing'
import { log, logErr } from './logging'
import * as client from './client'
import { getConfig } from './config'
import { CMD_INIT_CONSUMER } from './constants'

const socket = new IoClient(getConfig('client.url'))

socket.on(CMD_INIT_CONSUMER, () => {
  log('initializing our connection consumer')

  socket.emit(CMD_INIT_CONSUMER, {

  })
})

client.on('message', handleIncomingMessage)
client.on('error', (message) => logErr('ERROR: %j', message))
