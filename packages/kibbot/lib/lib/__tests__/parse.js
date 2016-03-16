'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chai = require('chai');

var _parse = require('../parse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('message parsing', function () {
  describe('gif command', function () {
    var inputs = [{
      input: '@bot gif',
      out: null
    }, {
      input: '@bot gif search name',
      out: {
        cmd: 'gif',
        args: 'search name'
      }
    }, {
      input: 'bot gif search name',
      out: {
        cmd: 'gif',
        args: 'search name'
      }
    }, {
      input: 'bot: gif search name',
      out: {
        cmd: 'gif',
        args: 'search name'
      }
    }, {
      input: '@bot: gif search name',
      out: {
        cmd: 'gif',
        args: 'search name'
      }
    }, {
      input: '@bot: giphy search name',
      out: {
        cmd: 'giphy',
        args: 'search name'
      }
    }, {
      input: 'giphy crazy',
      out: {
        cmd: 'giphy',
        args: 'crazy'
      }
    }, {
      input: 'gif foo bar',
      out: {
        cmd: 'gif',
        args: 'foo bar'
      }
    }, {
      input: 'gif',
      out: null
    }, {
      input: 'james++',
      out: {
        cmd: 'giveKarma',
        args: {
          name: 'james',
          amount: 1
        }
      }
    }, {
      input: 'james ++',
      out: {
        cmd: 'giveKarma',
        args: {
          name: 'james',
          amount: 1
        }
      }
    }, {
      input: 'james += 100',
      out: {
        cmd: 'giveKarma',
        args: {
          name: 'james',
          amount: 100
        }
      }
    }, {
      input: 'james -= 100',
      out: {
        cmd: 'giveKarma',
        args: {
          name: 'james',
          amount: -100
        }
      }
    }, {
      input: 'james-=1000',
      out: {
        cmd: 'giveKarma',
        args: {
          name: 'james',
          amount: -1000
        }
      }
    }, {
      input: 'james--1000',
      out: null
    }, {
      input: 'oh yeah, james--',
      out: {
        cmd: 'giveKarma',
        args: {
          name: 'oh yeah, james',
          amount: -1
        }
      }
    }];

    inputs.forEach(function (_ref) {
      var input = _ref.input;
      var out = _ref.out;

      it('parses ' + input, (0, _asyncToGenerator3.default)(function* () {
        var parsed = yield (0, _parse.parseMessage)(input);
        (0, _chai.expect)(parsed).to.eql(out);
      }));
    });
  });
});