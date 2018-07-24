const plugin = require('../plugin');
const request = require('request');

class plugin_weather {

    constructor(config, queue) {
        this.config = config;
        this.queue = queue;
    }
    
    fire() {
        var self = this;
        this.call_api(function(value) {
            let weather_data = {
                "weather": value.weather[0].main,
                "weather_desc": value.weather[0].description,
                "weather_icon": value.weather[0].id,
                "temp": Math.round(value.main.temp)
            };
            self.data = self.config;
            self.data.data = [weather_data];
            self.queue.push(self);
        })
    }

    call_api(cb) {
        const owm_key     = '6216ac761ade705b1c9c59d69cee478f'; 
        const owm_city    = '6359304'; // Madrid, Madrid, Madrid pedazo de la españa en que nací
        const owm_unit    = 'metric'; // Celsious
        const owm_version = '2.5';
        request('http://api.openweathermap.org/data/' + owm_version + '/weather?units=' + owm_unit + '&id='+ owm_city +'&appid=' + owm_key, {json: true}, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            cb(body);
        });
    }
}

module.exports = plugin_weather;
