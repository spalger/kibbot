'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var handler = exports.handler = function () {
  var ref = (0, _asyncToGenerator3.default)(function* (args) {
    var resp = yield giphy.translate({
      s: args,
      fmt: 'json'
    });

    return resp.data.images.fixed_height.url;
  });
  return function handler(_x) {
    return ref.apply(this, arguments);
  };
}();

exports.parse = parse;

var _giphyApi = require('giphy-api');

var _giphyApi2 = _interopRequireDefault(_giphyApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gifRequestRE = /^\s*(?:@?(?:kbn-hubot|hubot|bot):?)?\s*(gif|giphy)\s+([\w\W]*)/;
var giphy = (0, _giphyApi2.default)({ https: true });

function parse(message) {
  var gifMatch = message.match(gifRequestRE);
  if (!gifMatch) return null;

  var _gifMatch = (0, _slicedToArray3.default)(gifMatch, 3);

  var args = _gifMatch[2];

  return { cmd: 'gif', args: args };
}