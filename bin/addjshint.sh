#!/bin/bash
JSFILE=$1
if [ ! -n "${JSFILE}" ]
then
  echo "usage: addjshint <filename>"
  exit 1
fi

TMPFILE="/tmp/${RANDOM}.tmp"
echo '/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/' > "${TMPFILE}"
cat "${JSFILE}" >> "${TMPFILE}"
mv "${TMPFILE}" "${JSFILE}"
