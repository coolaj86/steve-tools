#!/usr/bin/env node
/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
(function () {
  "use strict";

  var path = require('path'),
      deploy;
  
  try {
    deploy = require(path.join(process.cwd(), 'deploy'));
  } catch (e) {
    deploy = require('../lib/deploy');
  }

  deploy(function (err) {
    if (err) {
      process.exit(1);
    }
  });
}());
