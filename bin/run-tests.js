#!/usr/bin/env node
/*jshint node:true es5:true onevar:true laxcomma:true laxbreak:true*/
(function () {
  "use strict";

  require('colors');

  var fs = require('fs')
    , spawn = require('child_process').spawn
    , path = require('path')
    , forEachAsync = require('forEachAsync')
    , util = require('util')
    , justOneTest = process.argv[2]
    , dirs
    , tests
    , errors = []
    , options = {
          env: {
              HOST: 'localhost'
            , PORT: '3232'
          }
      }
    ;

  tests = justOneTest && [justOneTest] || fs.readdirSync(process.cwd() + '/tests');
  console.log(('Running ' + tests.length + ' tests...\n').green);
  forEachAsync(tests, function (next, testfile) {
    var ps
      , handler
      , testname
      , args = []
      , stderr = ''
      ;

    if (testfile.match(/\.js$/)) {
      handler = '/usr/local/bin/node';
    } else
    if (testfile.match(/\.py$/)) {
      handler = '/usr/bin/python';
    } else
    if (testfile.match(/\.rb$/)) {
      handler = '/usr/bin/ruby';
    } else
    if (testfile.match(/\.sh$/)) {
      handler = '/usr/bin/bash';
      args.push('-e');
    } else
    {
      console.warn('skipping unknown test: ' + testfile);
      next();
      return;
    }

    ps = spawn(handler, [path.join(process.cwd(), 'tests', testfile)], options);
    ps.stdout.on('data', function (chunk) {
      console.log(chunk.toString('utf8'));
    });
    ps.stderr.on('data', function (chunk) {
      stderr += chunk;
      console.error(chunk.toString('utf8'));
    });
    ps.on('exit', function (code) {
      if (code) {
        errors.push(testfile.red + ": " + stderr.substr(0, 100));
        // ✘ ✗ ✖
        util.print('✘'.yellow);
      } else {
        util.print('✓'.green);
      }

      next();
    });
  }).then(function () {
    util.puts('\n');
    if (errors.length) {
      console.log('✗ EPIC FAIL ✗'.red);
      console.log([''].concat(errors).join('\n\t'));
    } else {
      console.log('✓ EPIC WIN ✓'.green);
    }
  });
}());
