/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var util = require('util')
    , fs = require('fs')
    , path = require('path')
    , read  = require('read')
    , Sequence  = require('sequence')
    , version = JSON.parse(
          fs.readFileSync(
              path.join(__dirname, '..', 'package.json')
            , 'utf8'
          )
      ).version
    , args = require('optimist')
        .alias('v', 'version') // seems to not work
        .describe('v', "show the version as per package.json")
        .parse(process.argv)
    ;

  if (args.v || args.version) {
    util.puts(version);
  }
}());
