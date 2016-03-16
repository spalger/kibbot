import karmaStorage from 'node-persist'
import { fromNode as fn } from 'bluebird'

import { CMD_SAY } from '../constants'
import { getConfig } from '../config'

karmaStorage.initSync({
  dir: getConfig('karma.storeDir'),
  stringify: JSON.stringify,
  parse: JSON.parse,
  encoding: 'utf8',
  logging: false,
  continuous: true,
  interval: false,
  ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS
})

export async function handler({ name, amount }) {
  const prevRaw = await fn(cb => karmaStorage.getItem(name, cb))
  const previous = parseInt(prevRaw, 10)
  const current = isNaN(previous) ? amount : previous + amount

  await karmaStorage.setItem(name, current)

  return {
    type: CMD_SAY,
    payload: `${name} now has ${current} karma`,
  }
}

export function parse(message) {
  const giveKarmaRE = /^\s*(.+)\s*(--|\+\+|-=|\+=)\s*(\d+)?\s*$/

  const karmaMatch = message.match(giveKarmaRE)
  if (!karmaMatch) return null

  const cmd = 'giveKarma'
  const [, name, sign, amountString] = karmaMatch

  const shouldHaveAmount = (sign === '-=' || sign === '+=')
  if (shouldHaveAmount !== Boolean(amountString)) return null

  const parsed = amount => ({ cmd, args: { name: name.trim(), amount } })
  switch (sign) {
    case '++':
      return parsed(1)
    // case '+=':
    //   return parsed(parseInt(amountString, 10))
    case '--':
      return parsed(-1)
    // case '-=':
    //   return parsed(parseInt(amountString, 10) * -1)
    default:
      return null
  }
}
