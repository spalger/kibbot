import irc from 'irc'
import Joi from 'joi'
import Bluebird from 'bluebird'
import NickServ from 'nickserv'

import {
  ERROR,
  CLIENT_INIT,
  CONSUMER_PROPS,
  IRC_CLIENT_EVENT,
} from './actions'

const clients = new Map()

const clientPropsSchema = Joi.object().keys({
  network: Joi.string().required(),
  nick: Joi.string().required(),
  realName: Joi.string().required(),
  channels: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
}).required()

const ALL_CLIENT_EVENTS = [
  'message',
  'error',
  'registered',
  'motd',
  'names',
  'topic',
  'join',
  'part',
  'quit',
  'kick',
  'kill',
  'notice',
  'ping',
  'pm',
  'ctcp',
  'nick',
  'invite',
  '+mode',
  '-mode',
  'whois',
  'channellist_start',
  'channellist_item',
  'channellist',
  'action',
]

export class Consumer {
  constructor(socket) {
    this.socket = socket
    this.unbinds = []
    this.socket.on('disconnect', () => this.shutdown())
  }

  async init() {
    this.action(CLIENT_INIT)

    const clientProps = await this.waitFor(CONSUMER_PROPS)
    const { errors } = clientPropsSchema.validate(clientProps)
    if (errors) {
      const describe = (m, detail) => `${m}${m ? '\n' : ''}at "${detail.path}" :: ${detail.message}`
      this.action(ERROR, errors.details.reduce(describe, ''))
      return
    }

    const client = this.getClient(clientProps)
    this.proxyClientEvents(client)
  }

  getClient(args) {
    const id = JSON.stringify(args)
    const { network, nick, realName, channels, password, email } = args

    if (!clients.has(id)) {
      const client = new irc.Client(network, nick, {
        realName,
        channels,
        autoRejoin: true,
        autoConnect: true,
      })

      const nickserv = new NickServ('kbn-hubot', { password, email })
      nickserv.attach('irc', client)
      clients.set(id, { client, consumers: [] })
    }

    const { client, consumers } = clients.get(id)
    consumers.push(this)
    return client
  }

  bind(event, handler) {
    this.socket.addListener(event, handler)
    this.unbinds.push(() => this.socket.removeListener(event, handler))
  }

  proxyClientEvents(client) {
    ALL_CLIENT_EVENTS.forEach(event => {
      const handler = (...args) => this.action(IRC_CLIENT_EVENT, { event, args })
      client.on(event, handler)
      this.unbinds.push(() => client.removeListener(event, handler))
    })
  }

  async waitFor(event) {
    let resolve
    const promise = (new Bluebird(r => { resolve = r })).timeout(10000)
    this.socket.once(event, resolve)
    return await promise
  }

  shutdown() {
    for (const fn of this.unbinds) fn()
  }

  onConnectCmd() {

  }
}
