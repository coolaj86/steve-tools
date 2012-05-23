#!/usr/bin/env node
/*jshint laxcomma:true es5:true node:true*/

(function () {
  var ArgumentParser = require('argparse').ArgumentParser
    , watch = require('nodewatch')
    , colors = require('colors')
    , util = require('util')
    , path = require('path')
    , exec = require('child_process').exec
    , relevantExtensions = []
    , timeoutId
    , parser = new ArgumentParser({
          version: '0.0.0'
        , addHelp: true
        , descriptions: 'Simple app that recursively watches the working directory and runs a script when files with the appropriate extensions change'
      })
    , args
    ;

  parser.addArgument(['-x', '--extension'], {help: 'extensions that will trigger the script to run', metavar: 'EXT', action: 'append', required: true});
  parser.addArgument(['-s', '--script'], {help: 'script that runs when files with the correct extension change', defaultValue: 'deploy.sh'});
  parser.addArgument(['--timeout'], {help: 'time in ms following the most recent relevant change before the script is run', metavar: 'TIME', type:'int', defaultValue: 500});

  function log(msg, level) {
    if (typeof level !== 'string') {
      level = 'info';
    }
    level = level.toUpperCase();

    if (level === 'ERROR') {
      level = level.red.bold;
    }
    else if (level === 'ACTION') {
      level = level.yellow.bold;
    }
    else if (level === 'DEBUG') {
      level = level.magenta;
    }
    else {
      level = level.green;
    }

    console.log('[' + level + '] ' + msg);
  }

  function redeploy() {
    timeoutId = null;
    watch.clearListeners();
    log('starting redeployment', 'action');

    exec(args.script, function (err, stdout, stderr) {
      if (err) {
        log('problem deploying', 'error');
        console.log(stderr);
        return;
      }
      log('redeployment complete', 'action');
      watch.onChange(fileChanged);
    });
  }

  function fileChanged(file, prev, curr, action) {
    var relevant = relevantExtensions.some(function (regExp) {
      return regExp.test(file);
    });

    if (relevant) {
      log(action + ': ' + path.relative(process.cwd(), file), 'info');
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(redeploy, args.timeout);
    }
    else {
      log(action + ': ' + path.relative(process.cwd(), file) + ' unwatched extension', 'debug');
    }
  }

  args = parser.parseArgs();
  if (!args.extension || args.extension.length <= 0) {
    log('must specify at least one extension', 'error');
    process.exit(1);
  }
  args.script = path.resolve(args.script);
  if (!path.existsSync(args.script)) {
    log('script ' + args.script + ' not found', 'error');
    process.exit(1);
  }

  args.extension.forEach(function (extension) {
    relevantExtensions.push(new RegExp('\\.' + extension + '$'));
  });

  watch.add('.', true);
  watch.onChange(fileChanged);

}());
