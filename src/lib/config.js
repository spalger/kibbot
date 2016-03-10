import { readFileSync } from 'fs'
import { get } from 'lodash'
import { resolve } from 'path'
import Joi from 'joi'
import jsYaml from 'js-yaml'

const schema = Joi.object().keys({
  connection: Joi.object().keys({
    port: Joi.number().required(),
  }).default(),
  bot: Joi.object().keys({
    nick: Joi.string().required(),
    channel: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),

    network: Joi.string().default('irc.freenode.com'),
    realName: Joi.string().default(Joi.ref('nick')),
  }).default(),
  log: Joi.object().keys({
    debug: Joi.boolean().default(false),
    path: Joi.string().default('stdout'),
    errorPath: Joi.string().default('stderr'),
    events: Joi.array().items(Joi.string()).default([]),
  }).default(),
  karma: Joi.object().keys({
    storeDir: Joi.string().default(resolve(__dirname, '../../karma.store')),
  }).default(),
}).default().unknown(false)

export function loadFile(path) {
  let yaml

  try {
    yaml = readFileSync(path, 'utf8')
  } catch (e) {
    return null
  }

  return jsYaml.safeLoad(yaml)
}

export function readFromEnv() {
  const valsFromEnv = Object.create(null);

  (function stepIn(schemaLevel, path) {
    // Only go deep on inner objects with children
    for (const child of schemaLevel._inner.children) {
      const childPath = path.concat(child.key)

      // If the child is an object recurse through it's children
      if (child.schema._type === 'object') {
        stepIn(child.schema, childPath)
      } else {
        const key = childPath.join('.')
        valsFromEnv[key] = process.env[key]
      }
    }
  }(schema, []))

  return valsFromEnv
}

const location = process.env.BOT_CONFIG || resolve(__dirname, '../../bot.yml')
const file = loadFile(location)
const { error: errors, value: values } = Joi.validate(file || readFromEnv(), schema, {
  abortEarly: false,
  convert: true,
  allowUnknown: false,
})


if (errors) {
  const describe = (m, detail) => `${m}${m ? '\n' : ''}at "${detail.path}" :: ${detail.message}`
  throw new Error(errors.details.reduce(describe, ''))
}

export function getConfig(name) {
  if (!Joi.reach(schema, name)) {
    throw new Error(`Missing config key "${name}"`)
  }

  return get(values, name)
}
