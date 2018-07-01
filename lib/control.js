class control {

    constructor(queue) {
        this.queue = queue;
        this.config = this.getConfig();
    }

    getConfig() {
        let config = [];
        const config_file = require('../config/plugins.json');
        for (let index in config_file) {
            let plugin = config_file[index];
            if (plugin.queue == this.queue.room_num) {
                config.push(plugin);
            }
        }
        return config;
    }

    init() {
        for (let index in this.config) {
            var plugin_class = require('../plugins/'+this.config[index].id+'/main.js');
            var plugin = new plugin_class(this.config[index], this.queue);
            plugin.fire();
        }
        
        //we dont want to set the loop here, each plugin will emit when available, the queu will manage which one of the ready plugins to show
        //add here the listen method for the queue?
        this.queue.listen();
//        let self = this;
//        setInterval(function() {
//            self.queue.pop();
//        }, 10000);
    }
}

module.exports = control;