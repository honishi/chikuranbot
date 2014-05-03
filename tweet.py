#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import re
from datetime import datetime as dt
from twython import Twython


if __name__ == "__main__":
    if len(sys.argv) != 6:
        print('not enough arguments')

    consumer_key = sys.argv[1]
    consumer_secret = sys.argv[2]
    access_key = sys.argv[3]
    access_secret = sys.argv[4]
    image_file = sys.argv[5]

    status = "{d.year}年{d.month}月{d.day}日{d.hour}時{d.minute:02}分頃のちくらん".format(d=dt.now())
    media = open(image_file, 'rb')

    twitter = Twython(consumer_key, consumer_secret, access_key, access_secret)
    response = twitter.update_status_with_media(status=status, media=media)
    # print(response)

    limit = twitter.get_lastfunction_header('X-MediaRateLimit-Limit')
    remaining = twitter.get_lastfunction_header('X-MediaRateLimit-Remaining')
    reset = twitter.get_lastfunction_header('X-MediaRateLimit-Reset')
    print("rate limit, limit: {} remaining: {} reset: {}".format(limit, remaining, reset))
