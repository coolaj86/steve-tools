/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var fs = require('fs')
    , path = require('path')
    , forEachAsync = require('forEachAsync')
    , HOME = process.env.HOME || process.env.USERPROFILE
    , defaultsFile = path.join(HOME, '.steverc')
    , read = require('read')
    , request = require('ahr2')
    , userConfig
    , semver = require('semver')
    ;

  function createConfig(cb) {
    var questions
      ;

    read({ "prompt": "What's your github login name? (not your e-mail address)" }, function (err, input) {
      if (err) {
        console.error('problem reading user input');
        return;
      }

      request.get("https://api.github.com/users/" + input).when(function (err, ahr2, data) {
        if (err) {
          console.error('problem fetching your github user');
          return;
        }

        userConfig = data;

        fs.writeFile(defaultsFile, JSON.parse(userConfig), function (err) {
          if (err) {
            console.error('problem writing github info to HOME/.steverc');
            return;
          }
          if (cb) {
            cb();
          }
        });
      });
    });
  }

  function getDirs(dir) {
    return {
        server: path.join(dir, 'server')
      , serverLib: path.join(dir, 'server', 'lib')
      , browser: path.join(dir, 'browser')
      , browserLib: path.join(dir, 'browser', 'lib')
      , browserInc: path.join(dir, 'browser', 'inc')
      , browserStyle: path.join(dir, 'browser', 'style')
      , cli: path.join(dir, 'cli')
      , cliLib: path.join(dir, 'server', 'lib')
      , lib: path.join(dir, 'lib')
    };
  }

  function createPackageJson(pkgname, user, type) {
    var pkg = {
        "name": pkgname
      , "main": "lib/index"
      , "version": "0.1.0"
      , "homepage": "https://" + user.github + ".github.com/" + pkgname
      , "repository": {
            "type": "git"
          , "url": "git://github.com/" + user.github + "/" + pkgname + ".git"
        }
      , "keywords": []
      , "author": user.name + "<" + user.email + ">" + "(http://" + user.www + ")"
      , "contributors": []
      , "engines": {
            "node": ">= 0.6.0"
        }
      , "dependencies": {
            "future": ">= 2.1.0"
          , "join": ">= 2.1.0"
          , "btoa": "1.x"
          , "bufferjs": "1.0.x"
          , "File": ">= 0.0.0"
          , "FileList": ">= 0.0.0"
          , "FormData": ">= 0.0.0"
          , "navigator": ">= 0.0.0"
          , "location": ">= 0.0.0"
        }
      , "lib": "lib"
      , "licenses": [
            {
                "type": "MIT"
              , "url": "http://www.opensource.org/licenses/MIT"
            }
          , {
                "type": "APACHE2"
              , "url": "http://apache.org/licenses/LICENSE-2.0.html"
            }
        ]
    };

    if (pkg.browser) {
      pkg.keywords.push('browser');
      pkg.name += '-browser';
      pkg.provides = pkgname;
      pkg.browserDependencies = {
          "events.node": "0.4.x"
        , "forEachAsync": "2.x"
        , "join": "2.x"
        , "pure": "2.x"
        , "domready": "0.2.x"
        , "bonzo": "1.x"
        , "qwery": "3.x"
        , "bean": "0.4.x"
        , "ahr2": "2.x"
        , "socket.io-browser": "0.8.x"
      };
    } else if (pkg.cli) {
      pkg.keywords.push('cli');
      pkg.dependencies = {
          "read": "0.0.x"
        , "ahr2": "2.x"
      };
      pkg.preferGlobal = true;
      pkg.bin = {};
      pkg.bin[pkgname] = 'bin/' + pkgname;
    } else if (pkg.server) {
      pkg.keywords.push('server');
      pkg.name += pkgname + '-server';
    }

    return pkg;
  }

  // TODO maybe use tar instead?
  function realInit(name, dir) {
    var dirs = getDirs(dir)
      ;

    dir = dir || '.';
    fs.mkdirSync(dir);
    fs.mkdirSync(dirs.server);
    fs.mkdirSync(dirs.browser);
    fs.mkdirSync(dirs.cli);
    fs.mkdirSync(dirs.lib);
  }

  function init() {
    if (path.existsSync(defaultsFile)) {
      userConfig = JSON.parse(fs.readFileSync(defaultsFile).toString('utf8'));
    } else {
      createConfig();
    }
  }

  function cli(args) {
    var name = args[3]
      , dir = args[4] || process.cwd()
      ;

    init(name, dir);
  }

  init.cli = cli;
  module.exports = init;
}());
