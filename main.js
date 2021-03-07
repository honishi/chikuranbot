const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// client.post('statuses/update', {status: '日本語'},  function(error, tweet, response) {
//     if(error) throw error;
//     console.log(tweet);  // Tweet body.
//     console.log(response);  // Raw response object.
// });

// Load your image
const data = require('fs').readFileSync('example.png');

// Make post request on media endpoint. Pass file data as media parameter
client.post('media/upload', {media: data}, function(error, media, response) {
    if (!error) {
        // If successful, a media object will be returned.
        console.log(media);

        // Lets tweet it
        var status = {
            status: 'I am a tweet',
            media_ids: media.media_id_string // Pass the media id string
        }

        client.post('statuses/update', status, function(error, tweet, response) {
            if (!error) {
                console.log(tweet);
            }
        });
    }
});