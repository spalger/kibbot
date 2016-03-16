'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.logErr = logErr;
exports.logDebug = logDebug;

var _util = require('util');

var _fs = require('fs');

var _config = require('./config');

var logPath = (0, _config.getConfig)('log.path');
var logErrorPath = (0, _config.getConfig)('log.errorPath');
var logDebugOn = (0, _config.getConfig)('log.debug');

var toStream = function toStream(path) {
  if (path === 'stdout') return process.stdout;
  if (path === 'stderr') return process.stderr;
  if (!path) throw new Error('missing path');
  return (0, _fs.createWriteStream)(path, { flags: 'a' });
};

var logStr = toStream(logPath);
function log() {
  logStr.write(_util.format.apply(undefined, arguments) + '\n');
}

var logErrStr = toStream(logErrorPath);
function logErr() {
  logErrStr.write(_util.format.apply(undefined, arguments) + '\n');
}

function logDebug() {
  if (logDebugOn) {
    logStr.write(_util.format.apply(undefined, arguments) + '\n');
  }
}