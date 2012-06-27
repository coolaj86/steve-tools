/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
/*
 * BROWSER
 */
(function () {
  "use strict";

  var $ = require('ender')
    , _ = require('underscore')
    , domReady = require('domready')
    , pure = require('pure').$p
    , request = require('ahr2')
    , forEachAsync = require('forEachAsync')
    , serializeForm = require('serialize-form')
    ;

  function init() {
    console.log('It is now safe to assign events and run other DOM code.');
    // It is recommended that you do so here.
  }

  console.log('Steve loves you!');
  domReady(init);
}());
