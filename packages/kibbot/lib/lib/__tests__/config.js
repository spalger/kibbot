'use strict';

var _chai = require('chai');

var _config = require('../config');

describe('config', function () {
  it('reads config values from the environment', function () {
    process.env['bot.nick'] = 'kbn-hubot';
    process.env['bot.realName'] = 'Some sort of robot';
    (0, _chai.expect)((0, _config.readFromEnv)()).to.have.property('bot.nick', 'kbn-hubot');
    (0, _chai.expect)((0, _config.readFromEnv)()).to.have.property('bot.realName', 'Some sort of robot');
  });
});