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

let index_plugin;
for (index in config) {
    if (config[index].name === plugin_name) {
        index_plugin = index;
        break;
    }
}

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
        if (index_plugin !== undefined) {
            console.log("plugin already configured");
            process.exit(1);
        } else {
            fs.mkdir('./views/plugins/'+plugin_name+'/',function (err) {
                if (err) throw err;
                fs.link('./plugins/'+plugin_name+'/main.hbs', './views/plugins/'+plugin_name+'/main.hbs', function (err, file) {
                    if (err) throw err;
                });
            });
            let plugin_obj = {"name": plugin_name};
            config.push(plugin_obj);

            fs.writeFile('./config/plugins.json', JSON.stringify(config), 'utf8', function (err, file) {
                if (err) throw err;
            });
        }
        break;
    case 'disable':
        if (index_plugin === undefined) {
            console.log("plugin not configured");
            process.exit(1);
        } else {
            fs.unlink('./views/plugins/' + plugin_name + '/main.hbs', function (err, file) {
                if (err) throw err;
                fs.rmdir('./views/plugins/' + plugin_name + '/', function (err) {
                    if (err) throw err;
                });
            });
            delete config[index_plugin];
            fs.writeFile('./config/plugins.json', JSON.stringify(config), 'utf8', function (err, file) {
                if (err) throw err;
            });
        }
        break;
    default:
        console.log("Unknown operation");
        process.exit(1);
}
