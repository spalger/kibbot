import { handleIncomingMessage } from './routing'
import { log, logErr } from './logging'
import { client } from './irc'
import { getConfig } from './config'

getConfig('log.events')
.forEach(name => client.on(name, (...args) => {
  const message = args.pop()
  if (!message || !message.rawCommand) {
    // the last arg is ususally the raw "message" object, which is too much to log,
    // so we drop it. But if that last arg is falsy or doesn't have a rawCommand
    // property then it probably isn't a message.
    args.push(message)
  }

  log('EVENT: %j', name, ...args)
}))

client.on('message', handleIncomingMessage)
client.on('error', (message) => logErr('ERROR: %j', message))

const botNick = getConfig('bot.nick')
client.on('join', (room, nick) => {
  if (nick === botNick) {
    log(`JOINED room ${room}`)
  }
})
