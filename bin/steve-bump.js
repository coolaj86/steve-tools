#!/usr/bin/env node
/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
(function () {
  "use strict";

  var fs = require('fs')
    , path = require('path')
    , pkgConfigPath = path.join(process.cwd(), 'package.json')
    , pkg = JSON.parse(fs.readFileSync(pkgConfigPath))
    , read = require('read')
    , semver = require('semver')
    , sequence = require('sequence').create({})
    , bumpVer = require('../lib/bumper').bump
    , nextVer
    ;

  function parseReleaseLevel(input) {
    var map = {
            "m": "major"
          , "n": "minor"
          , "p": "patch"
        }
      , nextVer
      ;

    input = (input||"").trim().toLowerCase();
    
    if ('minor' === input) {
      input = 'n';
    }

    input = input.substr(0, 1);

    /*
    if ('c' === input) {
      return;
    }
    */

    return map[input];
  }

  sequence
    .then(function (next, err, ahr2, data) {
      this.level = parseReleaseLevel(process.argv[2]);
      if (!this.level) {
        console.log('package.json.version: ' + pkg.version);
        //console.log('\n(please read carefully as our menu has recently changed)\n');
        read({ "prompt": "Is this a [m]ajor, mi[n]or, or [p]atch release? or [c]ancel? (p): "}, next);
      } else {
        next(null, this.level);
      }
    })
    .then(function (next, err, input) {
      var level = parseReleaseLevel(input || 'p')
        , oldVer = pkg.version
        ;

      if (!level) {
        console.log('\nCancelled. package.json.version remains v' + oldVer);
        return;
      }

      nextVer = bumpVer(pkg.version, level);
      pkg.version = nextVer;
      fs.writeFileSync(pkgConfigPath, JSON.stringify(pkg, null, '  '));
      console.log("\nUpdated package.json.version from v" + oldVer + " to v" + nextVer);
      next();
    })
    ;

}());
