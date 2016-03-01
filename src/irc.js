import irc from 'irc'
import NickServ from 'nickserv'

import { getConfig } from './config'
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
