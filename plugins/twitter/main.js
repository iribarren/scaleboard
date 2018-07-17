const Twit = require('twit'); // this is how we import the twit package
const plugin = require('../plugin');

class plugin_twitter extends plugin {

    constructor(config, queue) {
        super(config, queue);
    }
    
    fire() {
        let T = new Twit(this.config);
        let response_object = this.config;
        let array_tweets = [];
        let paginated_tweets = [];
        let params = {screen_name: 'Scaleboard9', count: '9'};
        let self = this;

        T.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (let indice in tweets) {
                    let tw = {
                        'text': tweets[indice].text,
                        'profile_image_url': tweets[indice].user.profile_image_url,
                        'created': tweets[indice].created_at,
                        'user_name': tweets[indice].user.name,
                        'screen_name': tweets[indice].user.screen_name
                    };
                    array_tweets.push(tw);
                    if ((parseInt(indice) + 1) % 3 === 0 || typeof tweets[indice + 1] === undefined) {
                        paginated_tweets.push(array_tweets);
                        array_tweets = [];
                    }
                }

                response_object.data = paginated_tweets;
                self.data = response_object;
                self.queue.push(self);
            }
        });
    }
}

module.exports = plugin_twitter;