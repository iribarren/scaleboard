# Scaleboard

A plugin based dashboard manager to show info from different sources on a Screen

## Instalation

Dependencies:
* node
* npm
* bower

Clone this repository in your machine

install npm dependencies
`npm install`

install bower dependencies
`bower install`

## Usage

The app shows info from different plugins in the screen. Before using it some of the available plugins should be enabled (plugin management explained below) For example:

`nodejs manage.js enable chuck`

Hit enter for all the questions and then run

`node index.js`

And access `http://localhost:3000/screen`

## Plugins structure

Plugins are stored in each own separate directory called `Plugins`. Each plugin is composed of these files:

* `main.js`:  the logic of the plugin. It retrieves __what__ is going to be shown in the dashboard
* `main.hbs`: template of the plugin. It specifies __how__ the info is going to be shown in the dashboard
* `config.example.json`: Configuration file example for the plugin. It specifies which fields are required for the plugin to work. If the values are added to the example, they may be used as default values when the plugin is enabled. Example value for configuration fields that hold credentials should not be provided.

This is the basic structure of a `main.js` file:

```javascript
const plugin = require('../plugin');

class plugin_name {

    constructor(config, queue) {
        this.config = config;
        this.queue = queue;
    }
    
    fire() {
    
        //RETRIEVE DATA - THIS IS WHERE YOU MAKE THE MAGIC HAPPEN
        
        this.queue.push(this);
    }
}

module.exports = plugin_name;
```

Every plugin extends a basic `plugin` class that defines a generic constructor 
that loads the dependencies of the plugin and must define a `fire()` method that
 retrieves some kind of data and pushes the plugin into the dashboard queue.

This is the basic structure of a `main.js` file:

```html
<div class="jumbotron" id="{{id}}_plugin">
    <h1 class="display-4">{{name}}</h1>
    {{#data}}
    <div class="lead">
        <!-- your content-->    
    </div>
    {{/data}}
</div>
```

This is the basic structure of a `config.example.json` file:

```javascript
{
    "id": "",            // IDENTIFIER FOR THE PLUGIN - MUST BE THE SAME AS THE FOLDER WHERE IT IS STORED
    "name": "",          // NAME OF THE PLUGIN - IT WILL BE SHOWN IN THE HEADER OF THE INFO
    "template": "",      // FILE USED TO SHOW THE DATA
    "data_interval": "", // SECONDS BETWEEN PAGINATION FOR PLUGIN DATA
    "queue": "",         // WHICH ON OF THE QUEUES IS GOING TO SHOW THE PLUGIN INFO (1,2)
    "duration": ""       // HOW LONG WILL THE PLUGIN STAY IN THE SCREEN - NOT WORKING YET
}
```
These fields are required for all the plugins. Additional configuration fields can be added if needed.

Once a plugin is developed, it must be added to the `config/plugins.json` file.

## Manage plugins

There is a script called `manage.js` to manage plugins and make it easier to create a new plugins.
The script can do the following operations:

`node manage.js add plugin_name`

Creates a new plugin with the given name in the `plugins` directory with the boilerplate code explained in the previous section

`node manage.js enable plugin_name` 

Adds the given plugin to the `plugins.json` configuration file using the plugins example configuration, and creates a symlink to the template in the public `views` folder.

`node manage.js disable plugin_name` 

Deletes the given plugin's entry in the configuration file, and unlinks it's template from the public `views` folder
