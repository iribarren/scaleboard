const plugin = require('../plugin');

class plugin_name {

    constructor(config, queue) {
        this.config = config;
        this.queue = queue;
    }
    
    fire() {
        //retrieve data
        this.queue.push(this);
    }
}

module.exports = plugin_name;