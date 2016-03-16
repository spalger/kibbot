'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

exports.loadFile = loadFile;
exports.readFromEnv = readFromEnv;
exports.getConfig = getConfig;

var _fs = require('fs');

var _lodash = require('lodash');

var _path = require('path');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _joi2.default.object().keys({
  connection: _joi2.default.object().keys({
    port: _joi2.default.number().required()
  }).default(),

  client: _joi2.default.object().keys({
    url: _joi2.default.string().uri().required()
  }).default(),

  bot: _joi2.default.object().keys({
    nick: _joi2.default.string().required(),
    channel: _joi2.default.string().required(),
    password: _joi2.default.string().required(),
    email: _joi2.default.string().email().required(),

    network: _joi2.default.string().default('irc.freenode.com'),
    realName: _joi2.default.string().default(_joi2.default.ref('nick'))
  }).default(),
  log: _joi2.default.object().keys({
    debug: _joi2.default.boolean().default(false),
    path: _joi2.default.string().default('stdout'),
    errorPath: _joi2.default.string().default('stderr'),
    events: _joi2.default.array().items(_joi2.default.string()).default([])
  }).default(),
  karma: _joi2.default.object().keys({
    storeDir: _joi2.default.string().default((0, _path.resolve)(__dirname, '../../karma.store'))
  }).default()
}).default().unknown(false);

function loadFile(path) {
  var yaml = void 0;

  try {
    yaml = (0, _fs.readFileSync)(path, 'utf8');
  } catch (e) {
    return null;
  }

  return _jsYaml2.default.safeLoad(yaml);
}

function readFromEnv() {
  var valsFromEnv = (0, _create2.default)(null);

  (function stepIn(schemaLevel, path) {
    // Only go deep on inner objects with children
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(schemaLevel._inner.children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var child = _step.value;

        var childPath = path.concat(child.key);

        // If the child is an object recurse through it's children
        if (child.schema._type === 'object') {
          stepIn(child.schema, childPath);
        } else {
          var key = childPath.join('.');
          valsFromEnv[key] = process.env[key];
        }
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
  })(schema, []);

  return valsFromEnv;
}

var location = process.env.BOT_CONFIG || (0, _path.resolve)(__dirname, '../../bot.yml');
var file = loadFile(location);

var _Joi$validate = _joi2.default.validate(file || readFromEnv(), schema, {
  abortEarly: false,
  convert: true,
  allowUnknown: false
});

var errors = _Joi$validate.error;
var values = _Joi$validate.value;


if (errors) {
  var describe = function describe(m, detail) {
    return '' + m + (m ? '\n' : '') + 'at "' + detail.path + '" :: ' + detail.message;
  };
  throw new Error(errors.details.reduce(describe, ''));
}

function getConfig(name) {
  if (!_joi2.default.reach(schema, name)) {
    throw new Error('Missing config key "' + name + '"');
  }

  return (0, _lodash.get)(values, name);
}