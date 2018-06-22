"use strict";

const hostname = '127.0.0.1';
const port = 3000;

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var control = require('./lib/control');
var queue = require('./lib/queue');

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

let q1 = new queue(io, 1);
let ctrl1 = new control(q1);
ctrl1.init();

let q2 = new queue(io, 2);
let ctrl2 = new control(q2);
ctrl2.init();