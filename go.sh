#!/usr/bin/env bash

set -x
set -e

which python

basedir=$(cd $(dirname $0);pwd)                                                                    

url_chikuran='http://www.chikuwachan.com/live/'
url_gyazo='http://gyazo.com/upload.cgi'
output=/tmp/temp.png

cd ${basedir}

source ./go.env

phantomjs ./rasterize.js "${url_chikuran}" ${output}
uploaded_url=$(curl -X POST ${url_gyazo} -F "imagedata=@${output}" -F 'filename=gyazo.com')
./tweet.py "${consumer_key}" "${consumer_secret}" "${access_key}" "${access_secret}" "${uploaded_url}"
