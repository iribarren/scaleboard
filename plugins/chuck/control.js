const plugin = require('../plugin');
const request = require('request');

class plugin_chuck extends plugin{

    constructor(config, queue) {
        super(config,queue);
    }

    fire() {
        var self = this;
        this.call_api(function(value) {
            self.data = {
                "id": "chuck-quotes", 
                "name": "Chuck Norris Quotes", 
                "template": "/views/plugins/chuck/main.hbs", 
                "data": [value], 
                "data_interval": 3
            };
            self.queue.push(self);
        })
    }

    call_api(cb) {
        request('https://api.chucknorris.io/jokes/random', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            cb(body.value);
        });
    }
}

module.exports = plugin_chuck;