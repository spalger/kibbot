import { format } from 'util'

import { client } from './irc'
// import { log } from './logging'
import { logErr } from './logging'
import { parseMessage } from './parse'

import { handler as giphy } from './cmds/giphy'
import { handler as karma } from './cmds/karma'

export async function routeMessage({ cmd, args }) {
  switch (cmd) {
    case 'gif':
    case 'giphy':
      return await giphy(cmd, args)
    case 'giveKarma':
      return await karma(cmd, args)
    default:
      throw new Error(format('unknown command %j with args %j', cmd, args))
  }
}

export function handleIncomingMessage(from, to, message) {
  // log('from: %j to: %j message: %j', to, from, message)

  parseMessage(message)
  .then(parsed => {
    // ignore messages that fail to parse
    if (!parsed) return

    routeMessage(parsed)
    .then(response => client.say(to, response))
    .catch(err => logErr(`ROUTE MESSAGE FAILURE \n${err.stack}`))
  })
}
