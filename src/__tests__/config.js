import { expect } from 'chai'

import { readFromEnv } from '../config'

describe('config', () => {
  it('reads config values from the environment', () => {
    process.env['bot.nick'] = 'kbn-hubot'
    process.env['bot.realName'] = 'Some sort of robot'
    expect(readFromEnv()).to.have.property('bot.nick', 'kbn-hubot')
    expect(readFromEnv()).to.have.property('bot.realName', 'Some sort of robot')
  })
})
