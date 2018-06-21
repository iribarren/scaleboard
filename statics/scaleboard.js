"use strict";

// Init Timer
window.timer = undefined;

// Init Socket.io
const socket = io.connect();

// Receive plugin data from server
socket.on("viewboard-1", function(data) {
    clearInterval(window.timer);
    let viewboard = new Viewboard();
    viewboard.render(data);
});

socket.on("viewboard-2", function(data) {
    clearInterval(window.timer);
    let viewboard = new Viewboard();
    viewboard.render(data);
});