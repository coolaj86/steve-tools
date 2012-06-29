/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var fs = require('fs')
    , path = require('path')
    ;

  fs.exists = fs.exists || path.exists;
  
  function rfind(fullpath, next) {
    fs.exists(fullpath, function (exists) {
      var fullpathArr
        , filename
        ;

      if (exists) {
        next(null, fullpath);
        return;
      }
      
      fullpathArr = fullpath.split(path.sep);
      filename = fullpathArr.pop();
      fullpathArr.pop();

      if (!fullpathArr.length) {
        next(new Error('Not Found'));
        return;
      }

      fullpath = path.join(fullpathArr.join(path.sep), filename);
      rfind(fullpath, next);
    });
  }

  function rfindHelper(fullpath, cb) {
    fullpath = path.normalize(path.resolve(process.cwd(), fullpath));
    rfind(fullpath, cb || function () {});
  }

  if (require.main === module) {
    rfindHelper(process.argv[2], function (err, pathname) {
      if (err) {
        console.error('couldn\'t find ' + process.argv[2]);
        return;
      }
      console.log(pathname);
    });
  }
}());
