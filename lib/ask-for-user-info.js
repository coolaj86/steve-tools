/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var Sequence = require('sequence')
    , read = require('read')
    ;

  function askUserForInfo(next, context, dontConfirm) {
    var userData = context.githubData
      ;

    Sequence.create()

      //
      // Name
      // 
      .then(function (next) {
        var msg = "Your (organization) name: ";

        if (userData.name) {
          msg += "(default: " + userData.name + ") ";
        } else {
          msg += "(i.e. John Doe or ACME Inc) ";
        }

        if (dontConfirm && userData.name) {
          next();
        } else {
          read({ "prompt": msg}, next);
        }
      })
      .then(function (next, input) {
        userData.name = input || userData.name;
        next();
      })


      //
      // Email
      //
      .then(function (next) {
        var msg = "Your (organization) email: ";

        if (userData.email) {
          msg += "(default: " + userData.email + ") ";
        } else {
          msg += "(i.e. john.doe@example.com) ";
        }

        if (dontConfirm && userData.email) {
          next();
        } else {
          read({ "prompt": msg}, next);
        }
      })
      .then(function (next, input) {
        userData.email = input || userData.email;
        next();
      })


      //
      // Website
      //
      .then(function (next) {
        var msg = "Your (organization) blog or website ";

        if (userData.blog) {
          msg += "(default: " + userData.blog + ") ";
        } else {
          msg += "(i.e. https://secureblog.example.com) ";
        }

        if (dontConfirm && userData.blog) {
          next();
        } else {
          read({ "prompt": msg}, next);
        }
      })
      .then(function (next, input) {
        userData.blog = input || userData.blog;
        if (userData.blog && !/^http/.test(userData.blog)) {
          userData.blog = 'http://' + userData.blog;
        }
        next();
      })


      //
      // Registry
      //
      .then(function (next) {
        var msg = "npm registry to use ";

        if (context.registry) {
          msg += "(default: " + context.registry + ") ";
        } else {
          msg += "(default: http://registry.npmjs.org) ";
        }

        if (dontConfirm && context.registry) {
          next();
        } else {
          read({ "prompt": msg}, next);
        }
      })
      .then(function (next, input) {
        context.registry = input || context.registry;
        if (context.registry && !/^http/.test(context.registry)) {
          context.registry = 'http://' + context.registry;
        }
        next();
      })


      //
      // Registry Username
      //
      .then(function (next) {
        var msg = "npm username to use ";

        if (context.npmusername) {
          msg += "(default: " + context.npmusername + ") ";
        } else {
          msg += "(i.e. johndoe) ";
        }

        if (dontConfirm && context.npmusername) {
          next();
        } else {
          read({ "prompt": msg}, next);
        }
      })
      .then(function (next, input) {
        context.npmusername = input || context.npmusername;
        next();
      })


      //
      // Registry Secret
      //
      .then(function (next) {
        var msg = "npm secret to use ";

        if (context.n) {
          msg += "(default: " + context.npmsecret + ") ";
        } else {
          msg += "(i.e. secret) ";
        }

        if (dontConfirm && context.npmsecret) {
          next();
        } else {
          read({ "prompt": msg}, next);
        }
      })
      .then(function (next, input) {
        context.npmsecret = input || context.npmsecret;
        next();
      })


      //
      // Callback
      //
      .then(function () {
        // the parent next
        next(userData);
      })
      ;
  }

  module.exports = askUserForInfo;
}());
