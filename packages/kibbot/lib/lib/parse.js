'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseMessage = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var parseMessage = exports.parseMessage = function () {
  var ref = (0, _asyncToGenerator3.default)(function* (message) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(_cmds.parsers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var parser = _step.value;

        var parsed = yield parser(message);
        if (parsed != null) return parsed;
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

    return null;
  });
  return function parseMessage(_x) {
    return ref.apply(this, arguments);
  };
}();

var _cmds = require('../cmds');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }