import giphyFactory from 'giphy-api'

const gifRequestRE = /^\s*(?:@?(?:kbn-hubot|hubot|bot):?)?\s*(gif|giphy)\s+([\w\W]*)/
const giphy = giphyFactory()

export function parse(message) {
  const gifMatch = message.match(gifRequestRE)
  if (!gifMatch) return null
  const [, cmd, args] = gifMatch
  return { cmd, args }
}

export async function handler(cmd, args) {
  const resp = await giphy.translate({
    s: args,
    fmt: 'json',
  })

  return resp.data.images.fixed_height.url
}
