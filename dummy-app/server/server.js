/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
/*
 * SERVER
 */
(function () {
  "use strict";

  var steve = require('./steve')
    , connect = require('connect')
    , _ = require('underscore')
    , forEachAsync = require('forEachAsync')
    , app = connect.createServer()
    ;


  function getHello(request, response) {
    response.json(request.params);
    response.end();
  }

  function router(rest) {
    rest.get('/hello/:name?', getHello);
  }

  app
    .use(steve)
    .use(connect.router(router))
    ;

  module.exports = app;
}());
