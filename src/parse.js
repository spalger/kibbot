import { parse as giphy } from './cmds/giphy'
import { parse as karma } from './cmds/karma'

const parsers = [
  giphy,
  karma,
]

export async function parseMessage(message) {
  for (const parser of parsers) {
    const parsed = await parser(message)
    if (parsed != null) return parsed
  }
  return null
}
