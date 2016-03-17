import Bluebird from 'bluebird'
import {
  logDebug,
  validateAgainstSchema,
  ACTION_ERROR,
  ACTION_REQUEST_CONSUMER_IDENT,
  ACTION_RECEIVE_CONSUMER_IDENT,
  ACTION_IRC_CLIENT_EVENT,
  ALL_IRC_CLIENT_EVENTS,
} from 'kibbot-utils'

import { ircClientFactory } from './irc_client'
import { clientIdentitySchema } from './schema'
const clients = new Map()

export class Consumer {
  constructor(socket) {
    this.socket = socket
    this.unbinds = new Set()

    this.bind = this.binder()
    this.bind('disconnect', () => this.shutdown())
  }

  binder(listener = this.socket, type = 'on') {
    return (event, handler) => {
      if (type === 'once') {
        let wrapped
        const unbinder = () => listener.removeListener(event, wrapped)
        wrapped = (...args) => {
          this.unbinds.delete(unbinder)
          handler.apply(this, args)
        }

        listener[type](event, handler)
        this.unbinds.add(unbinder)
      } else {
        listener[type](event, handler)
        this.unbinds.add(() => listener.removeListener(event, handler))
      }
    }
  }

  async init() {
    try {
      logDebug('initializing consumer')
      this.action(ACTION_REQUEST_CONSUMER_IDENT)

      const clientIdentity = await this.waitFor(ACTION_RECEIVE_CONSUMER_IDENT)
      const client = this.getClient(clientIdentity)
      this.proxyClientEvents(client)
    } catch (err) {
      this.action(ACTION_ERROR, { message: err.message, stack: err.stack })
      return
    }
  }

  getClient(rawIdentity) {
    logDebug('validating consumer identity %j', rawIdentity)
    const identity = validateAgainstSchema(clientIdentitySchema, rawIdentity)
    const id = JSON.stringify(identity)

    if (!clients.has(id)) {
      logDebug('creating new connection for id %j', id)
      clients.set(id, { client: ircClientFactory(identity), consumers: [] })
    } else {
      logDebug('reusing existing connection for id %j', id)
    }

    const { client, consumers } = clients.get(id)
    consumers.push(this)
    return client
  }

  proxyClientEvents(client) {
    logDebug('setting up proxies for all client event')
    const binder = this.binder(client, 'on')
    ALL_IRC_CLIENT_EVENTS.forEach(event => {
      binder(event, (...args) => this.action(ACTION_IRC_CLIENT_EVENT, { event, args }))
    })
  }

  async waitFor(event) {
    logDebug('waiting for %j', event)
    let resolve
    const promise = (new Bluebird(r => { resolve = r })).timeout(10000)
    this.binder(this.socket, 'once')(event, resolve)
    return await promise
  }

  shutdown() {
    logDebug('shutting down consumer')
    for (const fn of this.unbinds) fn()
    this.unbinds.clear()
  }

  action(type, payload) {
    logDebug('sending %j :: %j', type, payload)
    this.socket.emit(type, payload)
  }
}
