const twitter = require('twitter');
const puppeteer = require('puppeteer-core')

const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
const chikuran = 'http://www.chikuwachan.com/live/'
const screenshot = 'screenshot.png'

const chrome_mac = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const chrome_raspberry_pi = '/usr/bin/chromium-browser'

async function takeScreenshot() {
    const browser = await puppeteer.launch({
        executablePath: chrome_raspberry_pi,
        // https://stackoverflow.com/a/61050539
        args: [
            '--ignore-certificate-errors',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    })
    const page = await browser.newPage()
    await page.setUserAgent(userAgent)
    await page.setViewport({width: 1100, height: 1000, deviceScaleFactor: 2});
    await page.setJavaScriptEnabled(true)
    // await page.setDefaultNavigationTimeout(10000)
    console.log('Opening the page...')
    // const waitUntil = 'domcontentloaded'
    // const waitUntil = 'networkidle0'
    const waitUntil = 'networkidle2'
    await page.goto(chikuran, {waitUntil: waitUntil})
    console.log('Opened. Taking screenshot..')
    await page.screenshot({path: screenshot})
    console.log('Took screenshot.')
    await browser.close()
    console.log('Closed browser.')
}

async function tweetScreenshot() {
    const client = new twitter({
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
            status: makeTweetText(),
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

function makeTweetText() {
    const d = new Date()
    return d.getFullYear() + '年' + d.getMonth() + '月' + d.getDay() + '日'
        + d.getHours() + '時' + d.getMinutes() + '分ごろのちくらん'
}

takeScreenshot().then(r => {
    console.log(r)
    tweetScreenshot().then(r => {
        console.log('Post request done.')
    })
})
