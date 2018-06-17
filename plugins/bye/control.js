class plugin_bye {

    constructor(config) {
        //this.config = require('./plugins.json');
        this.config = config;
    }
    
    fire() {
        console.log(this.config);
    }
}

module.exports = plugin_bye;