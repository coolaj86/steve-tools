/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var semver = require('semver')
    , MAJOR = 0
    , MINOR = 1
    , PATCH = 2
    , LEVEL = {
          "major": MAJOR
        , "minor": MINOR
        , "patch": PATCH
      }
    ;

  function bump(ver, level) {
    var trio = semver.valid(ver).trim().replace(/v/g, '').split('.')
      ;

    level = LEVEL[level || 'PATCH'];

    if (!semver.valid(ver)) {
      return;
    }

    trio[level] = (Number(trio[level]) || 0) + 1;

    if (level === MAJOR) {
      trio[MINOR] = 0;
      trio[PATCH] = 0;
    }

    if (level === MINOR) {
      trio[PATCH] = 0;
    }

    return semver.valid(trio.join('.'));
  }

  module.exports.bump = bump;
}());
