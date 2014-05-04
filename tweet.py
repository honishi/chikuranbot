#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import re
import time
from datetime import datetime as dt
from twython import Twython


MAX_RETRY_COUNT = 20
SLEEP_WHEN_RETRY = 5


def main():
    if len(sys.argv) != 6:
        print('not enough arguments')

    consumer_key = sys.argv[1]
    consumer_secret = sys.argv[2]
    access_key = sys.argv[3]
    access_secret = sys.argv[4]
    image_file = sys.argv[5]

    status = "{d.year}年{d.month}月{d.day}日{d.hour}時{d.minute:02}分頃のちくらん".format(d=dt.now())
    media = open(image_file, 'rb')

    retry_count = 0
    while True:
        try:
            # raise Exception("retry test")
            twitter = Twython(consumer_key, consumer_secret, access_key, access_secret)
            response = twitter.update_status_with_media(status=status, media=media)
            # print(response)
            break
        except Exception as e:
            print("caught exception: {}".format(e))
            if retry_count == MAX_RETRY_COUNT:
                print("retried over.")
                os.sys.exit(1)
            retry_count += 1
            print("retrying({}/{})...".format(retry_count, MAX_RETRY_COUNT))
            sys.stdout.flush()
            time.sleep(SLEEP_WHEN_RETRY)

    limit = twitter.get_lastfunction_header('X-MediaRateLimit-Limit')
    remaining = twitter.get_lastfunction_header('X-MediaRateLimit-Remaining')
    reset = twitter.get_lastfunction_header('X-MediaRateLimit-Reset')
    print("rate limit, limit: {} remaining: {} reset: {}".format(limit, remaining, reset))


if __name__ == "__main__":
    main()
