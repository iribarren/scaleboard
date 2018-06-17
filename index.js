"use strict";

const hostname = '127.0.0.1';
const port = 3000;

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
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
io.on('connection', function (socket) {
    // Plugin handler
    socket.on("plugin", function(data) {
        io.emit("plugin", data);
    });

    // Message handler
    socket.on('message', function (msg) {
        io.emit('message', msg);
    });

    // Image handler
    socket.on('image', function (msg) {
        io.emit('image', msg);
    });

    // PROD MODE handler
    socket.on('prodmode', function (msg) {
        io.emit('prodmode', msg);
    });

    // sound handler
    socket.on('sound', function (msg) {
        io.emit('sound', msg);
    });

    // abort handler
    socket.on('abort', function () {
        io.emit('abort');
    });

});
