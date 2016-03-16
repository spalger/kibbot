'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeMessage = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var routeMessage = exports.routeMessage = function () {
  var ref = (0, _asyncToGenerator3.default)(function* (_ref) {
    var cmd = _ref.cmd;
    var args = _ref.args;

    if (_cmds.handlers.has(cmd)) {
      return yield _cmds.handlers.get(cmd)(args);
    }

    throw new Error((0, _util.format)('unknown command %j with args %j', cmd, args));
  });
  return function routeMessage(_x) {
    return ref.apply(this, arguments);
  };
}();

exports.handleIncomingMessage = handleIncomingMessage;

var _util = require('util');

var _client = require('./client');

var client = _interopRequireWildcard(_client);

var _logging = require('./logging');

var _parse = require('./parse');

var _cmds = require('../cmds');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleIncomingMessage(from, to, message) {
  (0, _logging.logDebug)('from: %j to: %j message: %j', to, from, message);

  (0, _parse.parseMessage)(message).then(function (parsed) {
    // ignore messages that fail to parse
    if (!parsed) return;

    routeMessage(parsed).then(function (response) {
      return client.say(to, response);
    }).catch(function (err) {
      return (0, _logging.logErr)('ROUTE MESSAGE FAILURE \n' + err.stack);
    });
  });
}