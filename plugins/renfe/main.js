const plugin = require('../plugin');
const request = require('request');

class plugin_renfe extends plugin{

    constructor(config, queue) {
        super(config,queue);
    }

    fire() {
        var self = this;
        var i;
        this.call_api(function(value){
            let aranjuez_data ={
                name: 'Aranjuez',
                hours: []
            };
            let centro_data = {
                name: 'Centro',
                hours: []
            };
            let lines = (JSON.parse(value)).lines;
            for (i in lines) {
                if (lines[i].lineBound === "Aranjuez"){
                    aranjuez_data.hours.push(lines[i].waitTime);
                } else {
                    centro_data.hours.push(lines[i].waitTime);
                }
            }
            
            self.data = self.config;
            self.data.data = [aranjuez_data, centro_data];
            self.queue.push(self);
        })
        
    }

    call_api(cb) {
        request.get({
            url: 'https://api.interurbanos.welbits.com/v1/stop/5-70'
        }, function (error, response, body) {
            cb(body);
        });
    }
}

module.exports = plugin_renfe;