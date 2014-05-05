chikuranbot
==
chikuwa-chan ranking snapshot keeper.

sample
--
![tweet](./sample/tweet.png)

* https://twitter.com/chikuranbot

setup
--
the following procedure is the one for mac os x.

````
# python runtime
brew update && brew install pyenv pyenv-virtualenv
pyenv virtualenv 3.3.3 chikuranbot-3.3.3
pip install -r requirements.txt

# headless browser
brew install phantomjs

# application configuration
cp ./go.env.sample ./go.env
vi ./go.env
````

sample usage using crontab
--

	*/2 * * * * /path/to/chikuranbot/go.sh >> /path/to/chikuranbot/go.log 2>&1

license
--
copyright &copy; 2014- honishi, hiroyuki onishi.

distributed under the [MIT license][mit].
[mit]: http://www.opensource.org/licenses/mit-license.php
