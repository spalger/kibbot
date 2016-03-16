import { expect } from 'chai'

import { parseMessage } from '../parse'

describe('message parsing', () => {
  describe('gif command', () => {
    const inputs = [
      {
        input: '@bot gif',
        out: null,
      },

      {
        input: '@bot gif search name',
        out: {
          cmd: 'gif',
          args: 'search name',
        },
      },

      {
        input: 'bot gif search name',
        out: {
          cmd: 'gif',
          args: 'search name',
        },
      },

      {
        input: 'bot: gif search name',
        out: {
          cmd: 'gif',
          args: 'search name',
        },
      },

      {
        input: '@bot: gif search name',
        out: {
          cmd: 'gif',
          args: 'search name',
        },
      },

      {
        input: '@bot: giphy search name',
        out: {
          cmd: 'giphy',
          args: 'search name',
        },
      },

      {
        input: 'giphy crazy',
        out: {
          cmd: 'giphy',
          args: 'crazy',
        },
      },

      {
        input: 'gif foo bar',
        out: {
          cmd: 'gif',
          args: 'foo bar',
        },
      },

      {
        input: 'gif',
        out: null,
      },

      {
        input: 'james++',
        out: {
          cmd: 'giveKarma',
          args: {
            name: 'james',
            amount: 1,
          },
        },
      },

      {
        input: 'james ++',
        out: {
          cmd: 'giveKarma',
          args: {
            name: 'james',
            amount: 1,
          },
        },
      },

      {
        input: 'james += 100',
        out: {
          cmd: 'giveKarma',
          args: {
            name: 'james',
            amount: 100,
          },
        },
      },

      {
        input: 'james -= 100',
        out: {
          cmd: 'giveKarma',
          args: {
            name: 'james',
            amount: -100,
          },
        },
      },

      {
        input: 'james-=1000',
        out: {
          cmd: 'giveKarma',
          args: {
            name: 'james',
            amount: -1000,
          },
        },
      },

      {
        input: 'james--1000',
        out: null,
      },

      {
        input: 'oh yeah, james--',
        out: {
          cmd: 'giveKarma',
          args: {
            name: 'oh yeah, james',
            amount: -1,
          },
        },
      },
    ]

    inputs.forEach(({ input, out }) => {
      it(`parses ${input}`, async () => {
        const parsed = await parseMessage(input)
        expect(parsed).to.eql(out)
      })
    })
  })
})
