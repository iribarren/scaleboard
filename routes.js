"use strict";

module.exports = function(app) {
    var bodyParser = require("body-parser");
    var multer = require('multer');

    // Multer options
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            let fileExt = file.originalname.split('.').pop();
            cb(null, changeCase.snakeCase(file.originalname.replace(/\.[^/.]+$/, '')) + '-' + Date.now() + '.' + fileExt);
        }
    });

    var upload = multer({storage: storage});
    var sizeOf = require('image-size');
    var changeCase = require('change-case');

    // Configuring body-parser
    // create application/json parser
    var jsonParser = bodyParser.json()
    // create application/x-www-form-urlencoded parser
    var urlencodedParser = bodyParser.urlencoded({extended: false})

    var viewDir = __dirname + '/views/';

    // Screen route (the screen that receive messages)
    app.get('/screen', function (req, res, next) {
        res.sendFile(viewDir + 'screen.html');
    });

    // Control panel route (the screen that send messages)
    app.get('/controlpanel', function (req, res, next) {
        res.sendFile(viewDir + 'controlpanel.html');
    });

    app.get('/sim', function (req, res, next) {
        res.sendFile(viewDir + 'simulate-plugin.html');
    });

    // API
    // FIXME: THIS IS A TEST
    // only post as we're publishing to the screen
    app.post('/api/:resource', urlencodedParser, function (req, res, next) {

        // Send bad request error if no POST information
        if (!req.body)
            return res.sendStatus(400);

        // API routes
        if (req.params.resource == 'test') {

            // Do your API things

            // send socket.io message
            io.sockets.emit('apiTest', req.params.resource);

            // Send response
            res.status(200).json({status: 'OK', msg: 'The message was sent sucessfully to the screen.'});

        } else {

            // Return a not found error
            res.status(404).json({status: 'ERROR', msg: 'API route not found.'});
        }

    });

    // Manage image uploads
    app.post('/upload-image', upload.single('file'), function (req, res, next) {
        if (!req.file.mimetype.startsWith('image/')) {
            return res.status(422).json({
                error: 'The uploaded file must be an image'
            });
        }

        var dimensions = sizeOf(req.file.path);

        if ((dimensions.width < 640)) {
            return res.status(422).json({
                error: 'The image must be at least 640 x 480px'
            });
        }

        return res.status(200).json(req.file);
    });

    // Manage sound uploads
    app.post('/upload-sound', upload.single('file'), function (req, res, next) {
        if (!req.file.mimetype.startsWith('audio/mpeg') && !req.file.mimetype.startsWith('audio/mp3')) {
            return res.status(422).json({
                error: 'The uploaded file must be an mp3'
            });
        }

        return res.status(200).json(req.file);
    });
}