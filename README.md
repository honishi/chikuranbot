chikuran hokanko
==

setup
--
````
brew update

# python runtime
brew install pyenv
brew install pyenv-virtualenv
pyenv virtualenv 3.3.3 chikuranbot-3.3.3
pip install -r requirements.txt

# headless browser
brew install phantomjs
````

sample crontab
--

	*/5 * * * * /path/to/chikuranbot/go.sh >> /path/to/dev/chikuranbot/go.log 2>&1

