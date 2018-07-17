"use strict";

const queues_num = 2;
const hostname = '127.0.0.1';
const port = 3000;

let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let control = require('./lib/control');
let queue = require('./lib/queue');

//var mime       = require('mime');

require('string.prototype.startswith');

// Adding static files
app.use('/assets', express.static(__dirname + '/bower_components'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/statics', express.static(__dirname + '/statics'));
app.use('/views', express.static(__dirname + '/views'));

require('./routes')(app);

// Init the server
server.listen(port, hostname, function () {
    console.log(`listening on http://${hostname}:${port}`);
});

// Socket.io connections
io.sockets.on("connection", function (socket) {
    socket.on("room", function(room) {
        socket.join(room);
    });
});

for (let i = 1; i <= queues_num; i++) {
    let ctrl = new control(new queue(io, i));
    ctrl.init();
}
