var fs = require('fs');

 class control {
    
    constructor () {
        this.config = require('./plugins.json');
    }
    
    init(socket) {
       for (var plugin_name in this.config) {
           var plugin_class = require('./plugins/'+plugin_name+'/control.js')
           var plugin = new plugin_class(this.config[plugin_name],socket);
           plugin.fire();
       }
    }
}

module.exports = control;