 class queue {

    constructor(socket) {
        this.socket = socket;
        this.plugins = [];
    }

    push(plugin) {
        this.plugins.push(plugin);
    }

    pop() {
        var plugin = this.plugins.shift();
        this.socket.emit("message",plugin.data);
        plugin.fire();
    }
}

module.exports = queue;