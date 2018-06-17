class plugin_bye {

    constructor(config, queue) {
        this.config = config;
        this.queue = queue;
    }
    
    fire() {
        console.log ("fire del plugin bye")
        this.data = "bye";
        this.queue.push(this);
    }
}

module.exports = plugin_bye;