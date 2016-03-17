import * as giphy from './giphy'
import * as karma from './karma'

export const handlers = new Map([
  ['gif', giphy.handler],
  ['giveKarma', karma.handler],
])

export const parsers = [
  giphy.parse,
  karma.parse,
]
