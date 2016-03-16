'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsers = exports.handlers = undefined;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _giphy = require('./giphy');

var giphy = _interopRequireWildcard(_giphy);

var _karma = require('./karma');

var karma = _interopRequireWildcard(_karma);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handlers = exports.handlers = new _map2.default([['gif', giphy.handler], ['giveKarma', karma.handler]]);

var parsers = exports.parsers = [giphy.parse, karma.parse];