import giphyFactory from 'giphy-api'

import { CMD_SAY } from '../constants'

const gifRequestRE = /^\s*(?:@?(?:kbn-hubot|hubot|bot):?)?\s*(gif|giphy)\s+([\w\W]*)/
const giphy = giphyFactory({ https: true })

export async function handler(args) {
  const resp = await giphy.translate({
    s: args,
    fmt: 'json',
  })

  return {
    type: CMD_SAY,
    payload: resp.data.images.fixed_height.url,
  }
}

export function parse(message) {
  const gifMatch = message.match(gifRequestRE)
  if (!gifMatch) return null
  const [,, args] = gifMatch
  return { cmd: 'gif', args }
}
