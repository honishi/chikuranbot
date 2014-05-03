chikuranbot
==
snapshot keeper for chikura-chan ranking.

setup
--
````
# python runtime
brew update && brew install pyenv pyenv-virtualenv
pyenv virtualenv 3.3.3 chikuranbot-3.3.3
pip install -r requirements.txt

# headless browser
brew install phantomjs

# configure
cp ./go.env.sample ./go.env
vi ./go.env
````

sample usage using crontab
--

	*/5 * * * * /path/to/chikuranbot/go.sh >> /path/to/dev/chikuranbot/go.log 2>&1

license
--
copyright &copy; 2014- honishi, hiroyuki onishi.

distributed under the [MIT license][mit].
[mit]: http://www.opensource.org/licenses/mit-license.php
