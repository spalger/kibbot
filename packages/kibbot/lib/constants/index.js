'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALL_CLIENT_EVENTS = exports.CMD_CLIENT_EVENT = exports.CMD_SAY = undefined;

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CMD_SAY = exports.CMD_SAY = 'V1_COMMAND_SAY';

var CMD_CLIENT_EVENT = exports.CMD_CLIENT_EVENT = 'V1_CLIENT_EVENT';
var ALL_CLIENT_EVENTS = exports.ALL_CLIENT_EVENTS = new _set2.default(['message', 'error', 'registered', 'motd', 'names', 'topic', 'join', 'part', 'quit', 'kick', 'kill', 'notice', 'ping', 'pm', 'ctcp', 'nick', 'invite', '+mode', '-mode', 'whois', 'channellist_start', 'channellist_item', 'channellist', 'action']);