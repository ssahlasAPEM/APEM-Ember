/* jshint node: true */

var moment = require('moment');
require('moment-duration-format');

var spawnSync = require('child_process').spawnSync;
var who = spawnSync('git', ['config', 'user.name']).stdout.toString();

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
  };

  if (deployTarget === 'local') {
    ENV.build.environment = 'development';
  };

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
