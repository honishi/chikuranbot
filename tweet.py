#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import re
from datetime import datetime as dt
from twitter import *


if __name__ == "__main__":
    if len(sys.argv) != 6:
        print('not enough arguments')

    consumer_key = sys.argv[1]
    consumer_secret = sys.argv[2]
    access_key = sys.argv[3]
    access_secret = sys.argv[4]
    url = sys.argv[5]

    matched = re.match(r'(http://)(.+)', url)
    if matched:
        url = matched.group(1) + 'i.' + matched.group(2) + '.png'

    message = "{d.year}年{d.month}月{d.day}日{d.hour}時{d.minute:02}分頃のちくらん {url}".format(d=dt.now(), url=url)

    t = Twitter(auth=OAuth(access_key, access_secret, consumer_key, consumer_secret))
    t.statuses.update(status=message)
