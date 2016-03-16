'use strict';

var _routing = require('./lib/routing');

var _logging = require('./lib/logging');

var _client = require('./lib/client');

var client = _interopRequireWildcard(_client);

var _config = require('./lib/config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(0, _config.getConfig)('log.events').forEach(function (name) {
  return client.on(name, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var message = args.pop();
    if (!message || !message.rawCommand) {
      // the last arg is ususally the raw "message" object, which is too much to log,
      // so we drop it. But if that last arg is falsy or doesn't have a rawCommand
      // property then it probably isn't a message.
      args.push(message);
    }

    _logging.log.apply(undefined, ['EVENT: %j', name].concat(args));
  });
});

client.on('message', _routing.handleIncomingMessage);
client.on('error', function (message) {
  return (0, _logging.logErr)('ERROR: %j', message);
});

var botNick = (0, _config.getConfig)('bot.nick');
client.on('join', function (room, nick) {
  if (nick === botNick) {
    (0, _logging.log)('JOINED room ' + room);
  }
});