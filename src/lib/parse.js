import { parsers } from '../cmds'

export async function parseMessage(message) {
  for (const parser of parsers) {
    const parsed = await parser(message)
    if (parsed != null) return parsed
  }
  return null
}
