import { get, has } from 'lodash'
import { resolve } from 'path'

const configFile = process.env.KIBBOT_CONFIG
if (!configFile) {
  throw new Error('Missing config file, specify KIBBOT_CONFIG')
}

const vals = require(resolve(process.env.KIBBOT_CONFIG))
export function getConfig(name) {
  if (!has(vals, name)) throw new Error(`Missing config key "${name}"`)
  return get(vals, name)
}
