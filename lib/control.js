class control {

    constructor() {
        this.config = require('../config/plugins.json');
    }

    init(queue) {
        for (var plugin_name in this.config) {
            var plugin_class = require('../plugins/' + plugin_name + '/main.js')
            var plugin = new plugin_class(this.config[plugin_name], queue);
            plugin.fire();
        }
        
        setInterval(function() {
            queue.pop();
        },10000);
    }
}

module.exports = control;