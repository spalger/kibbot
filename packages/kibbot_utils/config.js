import { get, has } from 'lodash'

const prod = process.env.NODE_ENV === 'production'
const vals = require(`./config.${prod ? 'prod' : 'dev'}.js`)

export function getConfig(name) {
  if (!has(vals, name)) throw new Error(`Missing config key "${name}"`)
  return get(vals, name)
}
