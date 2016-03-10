import { format } from 'util'
import { createWriteStream } from 'fs'

import { getConfig } from './config'
const logPath = getConfig('log.path')
const logErrorPath = getConfig('log.errorPath')
const logDebugOn = getConfig('log.debug')

const toStream = (path) => {
  if (path === 'stdout') return process.stdout
  if (path === 'stderr') return process.stderr
  if (!path) throw new Error('missing path')
  return createWriteStream(path, { flags: 'a' })
}

const logStr = toStream(logPath)
export function log(...args) {
  logStr.write(`${format(...args)}\n`)
}

const logErrStr = toStream(logErrorPath)
export function logErr(...args) {
  logErrStr.write(`${format(...args)}\n`)
}

export function logDebug(...args) {
  if (logDebugOn) {
    logStr.write(`${format(...args)}\n`)
  }
}
