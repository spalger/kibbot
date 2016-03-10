import irc from 'irc'
import NickServ from 'nickserv'
import SocketIo from 'socket.io'

import { getConfig } from './lib/config'
import {
  ALL_CLIENT_EVENTS,
  CMD_CLIENT_EVENT,
  CMD_SAY,
} from './constants'

const io = new SocketIo(getConfig('connection.port'))
const botNetwork = getConfig('bot.network')
const botNick = getConfig('bot.nick')
const botRealName = getConfig('bot.realName')
const botChannel = getConfig('bot.channel')
const botPassword = getConfig('bot.password')
const botEmail = getConfig('bot.email')

export const client = new irc.Client(botNetwork, botNick, {
  realName: botRealName,
  autoRejoin: true,
  autoConnect: true,
  channels: [botChannel],
})

export const nickserv = new NickServ('kbn-hubot', {
  password: botPassword,
  email: botEmail,
})

nickserv.attach('irc', client)

for (const event of ALL_CLIENT_EVENTS) {
  client.on(event, (...args) => {
    io.emit(CMD_CLIENT_EVENT, { event, args })
  })
}

io.on('connection', (socket) => {
  socket.on(CMD_SAY, ({ to, what }) => {
    client.say(to, what)
  })
})
