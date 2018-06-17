class plugin_hello {

    constructor(config, queue) {
        this.config = config;
        this.queue = queue;
    }
    
    fire() {
        console.log ("fire del plugin hello")
        this.data = "hello";
        this.queue.push(this);
    }
}

module.exports = plugin_hello;