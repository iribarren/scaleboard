"use strict";

// Init Timer
window.timer = undefined;

// Init Socket.io
let socket = io.connect();

// Receive plugin data from server
socket.on("viewboard-1", function(data) {
    clearInterval(window.timer);
    let viewboard = new Viewboard();
    console.log(data);
    viewboard.render(data);
});

socket.on("viewboard-2", function(data) {
    clearInterval(window.timer);
    let viewboard = new Viewboard();
    console.log(data);
    viewboard.render(data);
});