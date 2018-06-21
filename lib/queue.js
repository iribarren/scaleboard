 class queue {

    constructor(socket, event_num) {
        this.socket = socket;
        this.event_num = event_num;
        this.plugins = [];
    }

    push(plugin) {
        this.plugins.push(plugin);
    }

    pop() {
        if (this.plugins.length > 0) {
            let plugin = this.plugins.shift();
            if (plugin.data != undefined) {
                console.log("Emitting to viewboard-"+this.event_num+".");
                this.socket.emit("viewboard-"+this.event_num, plugin.data);
            }
            console.log("Firing plugin...");
            plugin.fire();
        }
    }
}

module.exports = queue;