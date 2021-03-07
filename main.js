const Twitter = require('twitter');
const puppeteer = require('puppeteer-core');

const chikuran = 'http://www.chikuwachan.com/live/'
const screenshot = 'screenshot.png'

async function takeScreenshot() {
    const browser = await puppeteer.launch({
        executablePath:
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        // https://stackoverflow.com/a/61050539
        headless: true,
        devtools: true,
        args: [
            '--ignore-certificate-errors',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    })
    const page = await browser.newPage()
    await page.setJavaScriptEnabled(true)
    console.log('Opening the page...')
    await page.goto(chikuran)
    console.log('Opened. Taking screenshot..')
    await page.screenshot({path: screenshot})
    console.log('Took screenshot.')
    await browser.close()
    console.log('Closed browser.')
}

async function tweetScreenshot() {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    const data = require('fs').readFileSync(screenshot);
    client.post('media/upload', {media: data}, function (error, media, response) {
        if (error) {
            console.log(error)
            return
        }
        console.log(media);
        const status = {
            status: 'I am a tweet',
            media_ids: media.media_id_string // Pass the media id string
        };
        client.post('statuses/update', status, function (error, tweet, response) {
            if (error) {
                console.log(error)
                return
            }
            console.log(tweet);
        })
    })
}

takeScreenshot().then(r => {
    console.log(r)
    tweetScreenshot().then(r => {
        console.log('All done.')
    })
})
