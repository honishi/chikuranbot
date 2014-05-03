#!/usr/bin/env bash

# set -x
set -e

echo '***' $(date) started.

basedir=$(cd $(dirname $0);pwd)                                                                    

url_chikuran='http://www.chikuwachan.com/live/'
output=/tmp/temp.png

cd ${basedir}

source ./go.env

phantomjs ./rasterize.js "${user_agent}" "${url_chikuran}" ${output}
./tweet.py "${consumer_key}" "${consumer_secret}" "${access_key}" "${access_secret}" "${output}"

echo '***' $(date) finished.
