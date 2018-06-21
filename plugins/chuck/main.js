const plugin = require('../plugin');
const request = require('request');

class plugin_chuck extends plugin {

    constructor(config, queue) {
        super(config, queue);
    }

    fire() {
        var self = this;
        this.call_api(function(value) {
            self.data = self.config;
            self.data.data = value;
            self.queue.push(self);
        });
    }

    call_api(cb) {
        let value = [];
        request('https://api.chucknorris.io/jokes/random', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            value.push(body.value);
        });
        request('https://api.chucknorris.io/jokes/random', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            value.push(body.value);
        });
        cb(value);
    }
}

module.exports = plugin_chuck;