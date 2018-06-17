class plugin_hello {

    constructor(config, socket) {
        this.config = config;
        this.socket = socket;
    }
    
    fire() {
        this.paint();
        console.log(this.config);
    }
    
    paint() {
        this.socket.emit("message", this.config.name);
    }
}

module.exports = plugin_hello;