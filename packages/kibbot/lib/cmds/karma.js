'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

// ttl* [NEW], can be true for 24h default or a number in MILLISECONDS

var handler = exports.handler = function () {
  var ref = (0, _asyncToGenerator3.default)(function* (_ref) {
    var name = _ref.name;
    var amount = _ref.amount;

    var prevRaw = yield (0, _bluebird.fromNode)(function (cb) {
      return _nodePersist2.default.getItem(name, cb);
    });
    var previous = parseInt(prevRaw, 10);
    var current = isNaN(previous) ? amount : previous + amount;
    yield _nodePersist2.default.setItem(name, current);
    return name + ' now has ' + current + ' karma';
  });
  return function handler(_x) {
    return ref.apply(this, arguments);
  };
}();

exports.parse = parse;

var _nodePersist = require('node-persist');

var _nodePersist2 = _interopRequireDefault(_nodePersist);

var _bluebird = require('bluebird');

var _config = require('../lib/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nodePersist2.default.initSync({
  dir: (0, _config.getConfig)('karma.storeDir'),
  stringify: _stringify2.default,
  parse: JSON.parse,
  encoding: 'utf8',
  logging: false,
  continuous: true,
  interval: false,
  ttl: false });

function parse(message) {
  var giveKarmaRE = /^\s*(.+)\s*(--|\+\+|-=|\+=)\s*(\d+)?\s*$/;

  var karmaMatch = message.match(giveKarmaRE);
  if (!karmaMatch) return null;

  var cmd = 'giveKarma';

  var _karmaMatch = (0, _slicedToArray3.default)(karmaMatch, 4);

  var name = _karmaMatch[1];
  var sign = _karmaMatch[2];
  var amountString = _karmaMatch[3];


  var shouldHaveAmount = sign === '-=' || sign === '+=';
  if (shouldHaveAmount !== Boolean(amountString)) return null;

  var parsed = function parsed(amount) {
    return { cmd: cmd, args: { name: name.trim(), amount: amount } };
  };
  switch (sign) {
    case '++':
      return parsed(1);
    // case '+=':
    //   return parsed(parseInt(amountString, 10))
    case '--':
      return parsed(-1);
    // case '-=':
    //   return parsed(parseInt(amountString, 10) * -1)
    default:
      return null;
  }
}