"use strict"

// Init Timer
window.timer;

// Init Socket.io
var socket = io.connect();

// Receive plugin data from server
socket.on("plugin", function(data) {
    clearInterval(window.timer);
    var viewboard = new Viewboard();
    viewboard.render(data);
});