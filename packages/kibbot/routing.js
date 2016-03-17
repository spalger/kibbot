import { format } from 'util'
import { logError } from 'kibbot-utils'

import { parseMessage } from './parse'
import { handlers } from './cmds'


export async function routeMessage({ cmd, args }) {
  if (handlers.has(cmd)) {
    return await handlers.get(cmd)(args)
  }

  throw new Error(format('unknown command %j with args %j', cmd, args))
}

export function handleIncomingMessage(from, to, message) {
  // logDebug('from: %j to: %j message: %j', to, from, message)

  parseMessage(message)
  .then(parsed => {
    // ignore messages that fail to parse
    if (!parsed) return

    routeMessage(parsed).catch(err => logError(`ROUTE MESSAGE FAILURE \n${err.stack}`))
  })
}
