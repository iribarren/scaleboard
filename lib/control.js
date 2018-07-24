class control {

    constructor(queue) {
        this.queue = queue;
        this.config = this.getConfig();
    }

    getConfig() {
        let config = [];
        try {
            config = require('../config/plugins.json');
        } catch (e) {
            console.log("No configuration file. You must enable some plugins.");
            process.exit(1);
        }
        let index;
        for (index in config) {
            let plugin = config[index];
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
        
        let self = this;
        setInterval(function() {
            self.queue.pop();
        }, 30000);
    }
}

module.exports = control;