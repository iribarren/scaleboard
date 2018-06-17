//hopefully this will a parent class for every plugin, so constructor code
//is not duplicated. but will js allow us to do this. only time will tell
class plugin {

    constructor(config, queue) {
        this.config = config;
        this.queue = queue;
    }
}

module.exports = plugin;