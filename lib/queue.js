 class queue {
    constructor(io, room_num) {
        this.io = io;
        this.room_num = room_num;
        this.plugins = [];
    }

    push(plugin) {
        this.plugins.push(plugin);
    }

    pop() {
        if (this.plugins.length > 0) {
            let plugin = this.plugins.shift();
            if (plugin.data != undefined) {
                this.io.sockets.in("viewboard-"+this.room_num).emit("message", plugin.data);
            }
            plugin.fire();
        }
    }
}

module.exports = queue;