var fs = require('fs');
var path = require( 'path' );
const plugin = require('../plugin');
const shuffle = require('shuffle-array');

class plugin_name {

    constructor(config, queue) {
        this.config = config;
        this.queue = queue;
    }
    
    fire() {
        let statics = "statics/images/gallery/qtm_2018/photobooth";
        let media = __dirname+"/../../"+statics;
        let photos = [];
        let data_photos = [];
        let photo_path;
        fs.readdir( media, function( err, files ) {
            if( err ) {
                console.error( "Could not list the directory.", err );
                process.exit( 1 );
            } 
            files.forEach( function( file, index ) {
                photo_path = path.join( statics, file );
                photos.push(photo_path);
            } );
            shuffle(photos);
            let i = 0;
            while (i<15) {
                data_photos.push({
                    "path1" : photos[i++],
                    "path2" : photos[i++],
                    "path3" : photos[i++]
                });
            }
        } );
        
        this.data = this.config;
        this.data.data = data_photos;
        this.queue.push(this);
    }
}

module.exports = plugin_name;
