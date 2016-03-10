import IoClient from 'socket.io-client'
import { EventEmitter } from 'events'

import { getConfig } from './config'
import { CMD_SAY, CMD_CLIENT_EVENT, ALL_CLIENT_EVENTS } from '../constants'

const socket = new IoClient(getConfig('client.url'))

const clientEventEmitter = new EventEmitter()
socket.on(CMD_CLIENT_EVENT, ({ event, args }) => {
  clientEventEmitter.emit(event, ...args)
})

export function on(event, handler) {
  if (ALL_CLIENT_EVENTS.has(event)) {
    clientEventEmitter.on(event, handler)
  } else {
    socket.on(event, handler)
  }
}

export function say(to, what) {
  socket.emit(CMD_SAY, { to, what })
}
