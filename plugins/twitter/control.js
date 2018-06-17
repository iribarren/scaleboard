var Twit = require('twit'); // this is how we import the twit package

class plugin_twitter {

    constructor(config, socket) {
        this.config = config;
        this.socket = socket;
    }
    
    fire() {
        var T = new Twit(config);

        var params = {screen_name: 'Scaleboard9', count: '10'};
        T.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
            

            var array_tweets = [];

            for (var indice in tweets) {
                var tw = {
                    'text': tweets[indice].text,
                    'profile_image_url': tweets[indice].user.profile_image_url,
                    'created': tweets[indice].created_at,
                    'user_name': tweets[indice].user.name,
                    'screen_name': tweets[indice].user.screen_name

                }
              array_tweets.push(tw);
            }
        }

        this.array_tweets = array_tweets;

        this.paint();
    }
    
    paint() {
        this.socket.emit("message", this.array);
    }
}

module.exports = plugin_twitter;
