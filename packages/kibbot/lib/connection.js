'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nickserv = exports.client = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _irc = require('irc');

var _irc2 = _interopRequireDefault(_irc);

var _nickserv = require('nickserv');

var _nickserv2 = _interopRequireDefault(_nickserv);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _config = require('./lib/config');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = new _socket2.default((0, _config.getConfig)('connection.port'));
var botNetwork = (0, _config.getConfig)('bot.network');
var botNick = (0, _config.getConfig)('bot.nick');
var botRealName = (0, _config.getConfig)('bot.realName');
var botChannel = (0, _config.getConfig)('bot.channel');
var botPassword = (0, _config.getConfig)('bot.password');
var botEmail = (0, _config.getConfig)('bot.email');

var client = exports.client = new _irc2.default.Client(botNetwork, botNick, {
  realName: botRealName,
  autoRejoin: true,
  autoConnect: true,
  channels: [botChannel]
});

var nickserv = exports.nickserv = new _nickserv2.default('kbn-hubot', {
  password: botPassword,
  email: botEmail
});

nickserv.attach('irc', client);

var _loop = function _loop(event) {
  client.on(event, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    io.emit(_constants.CMD_CLIENT_EVENT, { event: event, args: args });
  });
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = (0, _getIterator3.default)(_constants.ALL_CLIENT_EVENTS), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var event = _step.value;

    _loop(event);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

io.on('connection', function (socket) {
  socket.on(_constants.CMD_SAY, function (_ref) {
    var to = _ref.to;
    var what = _ref.what;

    client.say(to, what);
  });
});