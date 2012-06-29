/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  function parseNpmrc(str) {
    var lines = str.split(/\r|\n/g)
      , obj = {}
      , plines = []
      ;

    lines.forEach(function (line) {
      var m = /([^#]+)?(#.*)?/.exec(line)
        , stuff = (m[1]||"").trim()
        , comment = (m[2]||"").trim()
        , n = /([^=]+)=(.*)/.exec(stuff) || [null, "", ""]
        , key = n[1].trim()
        , value = n[2].trim()
        ;
      
      // don't push lines with duplicate keys
      if (!key || !obj[key]) {
        plines.push([key, value, comment]);
      }

      // overwrite earlier values with later values
      if (key) {
        obj[key] = value;
      }
    });

    return { hash: obj, lines: plines };
  }

  if (require.main === module) {
    console.log(parseNpmrc(require('fs').readFileSync(process.argv[2]).toString('utf8')));
  }

  module.exports = parseNpmrc;
}());
