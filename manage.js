var fs = require('fs');

const operation = process.argv[2];
if (operation === undefined) {
    console.log("No operation given");
    process.exit(1);
}

const plugin_name = process.argv[3];
if (plugin_name === undefined) {
    console.log("No plugin name given");
    process.exit(1);
}

const config = require('./config/plugins.json');

switch (operation) {
    case 'add':
        fs.mkdir('./plugins/'+plugin_name+'/',function (err) {
            if (err) throw err;
            fs.readFile('./plugins/boilerplate/plugin-boilerplate.js', function (err, file) {
                if (err) throw err;
                data = file.toString();
                data.replace('name',plugin_name);
                fs.writeFile('./plugins/'+plugin_name+'/main.js', data,function (err, file) {
                if (err) throw err;
                });  
            });
            fs.readFile('./plugins/boilerplate/plugin-boilerplate.hbs', function (err, file) {
                if (err) throw err;
                data = file.toString();
                fs.writeFile('./plugins/'+plugin_name+'/main.hbs', data,function (err, file) {
                    if (err) throw err;
                });
            });
        });
        break;
    case 'enable':
        if (plugin_name in config) {
            console.log("plugin already configured");
            process.exit(1);
        } else {
            fs.mkdir('./views/plugins/'+plugin_name+'/',function (err) {
                if (err) throw err;
                fs.link('./plugins/'+plugin_name+'/main.hbs', './views/plugins/'+plugin_name+'/main.hbs', function (err, file) {
                    if (err) throw err;
                });
            });
            config[plugin_name] = {};
            config[plugin_name].name = plugin_name;
            
            fs.writeFile('./config/plugins.json', JSON.stringify(config), 'utf8', function (err, file) {
                if (err) throw err;
            });
        }
        break;
    case 'disable':
        fs.unlink('./views/plugins/'+plugin_name+'/main.hbs', function (err, file) {
            if (err) throw err;
            fs.rmdir('./views/plugins/'+plugin_name+'/',function (err) {
                if (err) throw err;
            });
        });
        delete config.plugin_name;
        fs.writeFile('./config/plugins.json', JSON.stringify(config), 'utf8', function (err, file) {
            if (err) throw err;
        });
        break;
    default:
        console.log("Unknown operation");
        process.exit(1);
}
