"use strict";

// Init Socket.io
let socket = io.connect();
const viewboards = [new Viewboard(), new Viewboard()];

// Receive plugin data from server
socket.on("connect", function() {
    socket.emit("room", "viewboard-1");
    socket.emit("room", "viewboard-2");
    socket.emit("room", "ip");
});

socket.on("message", function (data) {
    if (data.queue) {
        clearInterval(viewboards[data.queue - 1].timer);
        viewboards[data.queue - 1].render(data);
    }
});

socket.on("message_ip", function (data) {
    $("#ip").html(data);
});

