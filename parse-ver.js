    /*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
    (function () {
      "use strict";

      var re = /\s*((\|\||\-)|(([<>~]?=?)\s*(v)?([0-9]+)(\.(x|[0-9]+))?(\.(x|[0-9]+))?(([\-+])([a-zA-Z0-9\.]+))?))\s*/g
        ;

      function parseRangeFull(str) {
        var m
          , arr = []
          , obj
          ;

        function prune(key) {
          if ('undefined' === typeof obj[key]) {
            delete obj[key];
          }
        }

        while (true) {
          m = re.exec(str);
          if (!m) {
            break;
          }
          obj = {
              semver: m[3]
            , operator: m[4] || m[2]
            , major: m[6]
            , minor: m[8]
            , patch: m[10]
          };
          if ('+' === m[12]) {
            obj.build = m[13];
          }
          if ('-' === m[12]) {
            obj.release = m[13];
          }
          Object.keys(obj).forEach(prune);
          arr.push(obj);
          //console.log(m);
        }

        return arr;
      }

      function test() {
        var str = '~1.0.0 || >= 1.1.7 < 2.0.0+build.1848 || v1.1.3 || 2.0.1-alpha.1227 || 1.0.0 - 1.0.x'
          ;
        console.log(parseRangeFull(str));
        console.log(parseRangeFull('v1.0.0'));
        console.log(parseRangeFull('< v2.0.0'));
        console.log(parseRangeFull('~v2.0.0'));
      }

      test();
    }());
