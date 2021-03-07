#!/usr/bin/env zsh

# set -x
set -e

echo '***' $(date) started.

basedir=$(cd $(dirname $0);pwd)

cd ${basedir}
# pwd

source ./.env
node ./main.js

echo '***' $(date) finished.
