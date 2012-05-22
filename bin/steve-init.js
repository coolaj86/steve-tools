#!/usr/bin/env node
/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
/*
 * BIN
 */
(function () {
  "use strict";

  var exec = require('child_process').exec
    , cnd = '[ ! -e "./server" ] && [ ! -e "./browser" ]'
    , dir = process.argv[2] || './'
    , cmd = "rsync -a " + __dirname + "/../dummy-app/* " + dir  + "/"
    , msg = 'steve init complete'
    , errmsg = 'no can do sparky... looks like steve has already been here'
    ;

  function showStatus(err, stdout, stderr) {
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
    }
    console.log('Remember to edit:');
    console.log('  * package.json');
    console.log('  * browser/package.json');
    console.log('  * server/package.json');
  }

  exec('if ' + cnd + '; then ' + cmd + '; echo ' + msg + '; else echo ' + errmsg + '; fi', showStatus);
}());
