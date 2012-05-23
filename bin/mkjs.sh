#!/bin/bash
JSFILE=$1
if [ ! -n "${JSFILE}" ]
then
  echo "usage: mkjs <filename>"
  exit 1
fi

echo '(function () {
  "use strict";

}());' > ${JSFILE}
addjshint "${JSFILE}"
#MODULE=`basename "$1" .js`
#sed -i '' s/my-module-name/${MODULE}/ ${1}
