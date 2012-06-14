/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
/*
 * BROWSER
 */
(function () {
  "use strict";

  var $ = require('ender')
    , domReady = require('domready')
    , serializeForm = require('serialize-form')
    , pure = require('pure').$p
    , request = require('ahr2')
    ;

  function init() {
    console.log('It is now safe to assign events and run other DOM code.');
    // It is recommended that you do so here.
  }

  console.log('Steve loves you!');
  domReady(init);
}());
