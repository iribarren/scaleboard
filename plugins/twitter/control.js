var Twit = require('twit'); // this is how we import the twit package
const plugin = require('../plugin');


class plugin_twitter extends plugin{

    constructor(config, queue) {
        super(config,queue);
    }
    
    fire() {
        var T = new Twit(this.config);
        var response_object = {
            "id": "plugin-twitter", 
            "name": "Twitter Plugin", 
            "template": "/views/plugins/twitter/main.hbs",
            "data_interval": 3
        }
        var array_tweets = [];

       // var params = {screen_name: 'Scaleboard9', count: '10'};
       var params = {q: '@scalefast', count: 10};
       var self = this;
        //T.get('statuses/user_timeline', params, 
        T.get('search/tweets', params, function(error, tweets, response) {
          if (!error) {
            for (var indice in tweets) {
                var tw = {
                    'text': tweets.statuses[0].text,
                    'profile_image_url': tweets.statuses[0].user.profile_image_url,
                    'created': tweets.statuses[0].created_at,
                    'user_name': tweets.statuses[0].user.name,
                    'screen_name': tweets.statuses[0].user.screen_name
                }
                
                array_tweets.push(tw);

            }

            response_object.data = array_tweets;
            console.log ("fire del plugin twitter");
            //console.log(array_tweets[0].text);
            self.data = response_object;
            self.queue.push(self);
          }
        });

        
    }
}

module.exports = plugin_twitter;
