module.exports = {
  init: function() {
    var obj;
	var fs = require('fs');

	 obj = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));

	 return obj;
  },

fire: function() {
    return module.exports.init();
  }
  
};