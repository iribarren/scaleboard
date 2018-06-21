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
        if (plugin.data != undefined) {
            this.socket.emit("viewboard-1", plugin.data);
        }
        plugin.fire();
    }
}

module.exports = queue;
