const plugin = require('../plugin');
const request = require('request');

class plugin_chuck extends plugin{

    constructor(config, queue) {
        super(config,queue);
    }

    fire() {
        var self = this;
        this.data = this.call_api(function(value){
            self.data = value;
            console.log("data del plugin: "+self.data)
            self.queue.push(self);
        })
        
    }

    call_api(cb) {
        request('https://api.chucknorris.io/jokes/random', {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(body.value);
            cb(body.value);
        });
    }
}

module.exports = plugin_chuck;