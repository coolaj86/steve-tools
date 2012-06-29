(function () {
  "use strict";

  var cmd = process.argv[2]
    , builder = require('../lib')
    , args = process.argv.slice(3)
    ;

  if (!builder[cmd]) {
    console.error("bad command '" + cmd + "'");
    return;
  }

  //builder[cmd].apply(builder, process.argv.slice(3));
  builder[cmd].cli(args);
}());
