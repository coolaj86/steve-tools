/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var fs = require('fs.extra')
    , path = require('path')
    , atob = require('atob')
    , btoa = require('btoa')
    , read = require('read')
    , request = require('ahr2')
    , parseNpmrc = require('./parse-npmrc')
    , askForUserInfo = require('./ask-for-user-info')
    , Sequence = require('sequence')
    , home = (process.env.HOME || process.env.APPDATA)
    , steveBase = path.join(home, '.stevejs')
    , npmrcBase = path.join((process.env.HOME || "windows's place"), '.npmrc')
    ;

  function steveHomeInit() {
    fs.mkdirp(steveBase, function (err) {
      if (err) {
        console.error('could not create / access ', steveBase);
        console.error(err);
        return;
      }
      
      checkNpmrc();
    });
  }

  function checkNpmrc() {
    fs.lstat(npmrcBase, function (err, stats) {
      if (err) {
        // TODO check EEXISTS (does that work on windows)?
        npmHomeInit();
        return;
      }
      if (!stats.isSymbolicLink()) {
        createLink();
      } else {

      }
    });
  }

  function createLink() {
    Sequence.create()
      .then(function (next) {
        fs.readFile(npmrcBase, function (err, data) {
          var npmrcObj;

          if (err) {
            npmHomeInit(next, {});
            return;
          }
          
          npmrcObj = parseNpmrc(data.toString('utf8'));
          npmHomeInit(next, npmrcObj);
        });
      })
      .then(function (next) {
        read({ "prompt": "What would you like to call your current npm configuration? (npmjs): "}, next);
      })
      ;
  }

  function npmHomeInit(next, npmrcObj) {
    var context = {}
      ;

    context.npmrcObj = npmrcObj;

    Sequence.create()
    /*
      .then(function (next) {
        fs.writeFile(npmrcBase, "", function (err) {
          if (err) {
            console.error("Could not read or create " + npmrcBase);
            console.error(err);
            return;
          }
          next();
        });
      })
    */
      .then(function (next) {
        read({ "prompt": "What's your github login name? (not your e-mail address): "}, next);
      })
      .then(function (next, err, login) {
        context.login = login;
        context.githubUrl = "https://api.github.com/users/" + login;
        console.log("Retreiving " + context.githubUrl);

        request.get(context.githubUrl).when(next);
      })
      .then(function (next, err, ahr, data) {
        if (!data) {
          context.githubData = {};
          console.error("... Failed.");
        } else {
          context.githubData = data;
          console.log(context.githubData);
        }

        fs.writeFile(path.join(steveBase, 'github.' + context.login + '.json'), JSON.stringify(context.githubData), function (err) {
          askForUserInfo(next, context);
        });
      })

      .then(function (next) {
        var npmrc = [
            "email = " + context.githubData.email
          , "_auth = " + btoa(context.npmusername + ":" + context.npmpassword)
          , "init.author.name = " + context.githubData.name
          , "init.author.email = " +  context.githubData.email
          , "init.author.url = " + context.githubData.blog
        ];
        console.log(npmrc.join('\n'));
      })
      ;
  }

  createLink();
  var args = require('optimist').parse(process.argv);
}());
