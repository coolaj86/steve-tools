#!/bin/bash
JSFILE=$1
if [ ! -n "${JSFILE}" ]
then
  echo "usage: mkjs <filename>"
  exit 1
fi

echo '/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
(function () {
  "use strict";

}());' > ${JSFILE}
#MODULE=`basename "$1" .js`
#sed -i '' s/my-module-name/${MODULE}/ ${1}
