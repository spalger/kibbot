import { format } from 'util'

import * as client from './client'
import { logDebug, logErr } from './logging'
import { parseMessage } from './parse'

import { handlers } from '../cmds'

export async function routeMessage({ cmd, args }) {
  if (handlers.has(cmd)) {
    return await handlers.get(cmd)(args)
  }

  throw new Error(format('unknown command %j with args %j', cmd, args))
}

export function handleIncomingMessage(from, to, message) {
  logDebug('from: %j to: %j message: %j', to, from, message)

  parseMessage(message)
  .then(parsed => {
    // ignore messages that fail to parse
    if (!parsed) return

    routeMessage(parsed)
    .then(response => client.say(to, response))
    .catch(err => logErr(`ROUTE MESSAGE FAILURE \n${err.stack}`))
  })
}
