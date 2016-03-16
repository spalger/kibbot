'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.on = on;
exports.say = say;

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _events = require('events');

var _config = require('./config');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = new _socket2.default((0, _config.getConfig)('client.url'));

var clientEventEmitter = new _events.EventEmitter();
socket.on(_constants.CMD_CLIENT_EVENT, function (_ref) {
  var event = _ref.event;
  var args = _ref.args;

  clientEventEmitter.emit.apply(clientEventEmitter, [event].concat((0, _toConsumableArray3.default)(args)));
});

function on(event, handler) {
  if (_constants.ALL_CLIENT_EVENTS.has(event)) {
    clientEventEmitter.on(event, handler);
  } else {
    socket.on(event, handler);
  }
}

function say(to, what) {
  socket.emit(_constants.CMD_SAY, { to: to, what: what });
}