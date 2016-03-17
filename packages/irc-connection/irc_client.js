import irc from 'irc'
import NickServ from 'nickserv'

export function ircClientFactory({ network, nick, realName, channels, password, email }) {
  const client = new irc.Client(network, nick, {
    realName,
    channels,
    autoRejoin: true,
    autoConnect: true,
  })

  const nickserv = new NickServ('kbn-hubot', { password, email })
  nickserv.attach('irc', client)

  return client
}
