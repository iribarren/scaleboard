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

Just run

`node index.js`

And access `http://localhost:3000/screen`

## Plugins structure

Plugins are stored in each own separate directory called `Plugins`. Each plugin is composed of two files:

* `main.js`:  the logic of the plugin. It retrieves __what__ is going to be shown in the dashboard
* `main.hbs`: template of the plugin. It specifies __how__ the info is going to be shown in the dashboard

This is the basic structure of a `main.js` file:

```javascript
const plugin = require('../plugin');

class plugin_name {

    constructor(config, queue) {
        this.config = config;
        this.queue = queue;
    }
    
    fire() {
        //retrieve data
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

Once a plugin is developed, it must be added to the `config/plugins.json` file.

## Manage plugins

There is a script called `manage.js` to manage plugins and make it easier to create a new plugins.
The script can do the following operations:

`node manage.js add plugin_name`

Creates a new plugin with the given name in the `plugins` directory with the boilerplate code explained in the previous section

`node manage.js enable plugin_name` 

Adds the given plugin to the `plugins.json` configuration file, and creates a symlink to the template in the public `views` folder

`node manage.js disable plugin_name` 

Deletes the given plugin's entry in the configuration file, and unlinks it's template from the public `views` folder
