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

require('./routes')(app);

// Init the server
server.listen(3000, function () {
    console.log('listening on *:3000');
});

// Socket.io connections
io.on('connection', function (socket) {

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
