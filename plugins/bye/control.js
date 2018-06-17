class plugin_bye {

    constructor(config, queue) {
        this.config = config;
        this.queue = queue;
    }
    
    fire() {
        this.data = "bye";
        this.queue.push(this);
    }
}

module.exports = plugin_bye;