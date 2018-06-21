const plugin = require('../plugin');
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class plugin_renfe extends plugin{

    constructor(config, queue) {
        super(config,queue);
    }

    fire() {
        var self = this;
        var trs;
        var tds = [];
        this.call_api(function(value){
            const dom = new JSDOM(value);
            trs = dom.window.document.querySelectorAll("#tabla tr");
            for (var i = 1; i<trs.length;i++) {
                tds.push(trs[i].querySelectorAll("td")[2].textContent);
            }
            self.data = self.config;
            self.data.data = tds;
            self.queue.push(self);
        })
        
    }

    call_api(cb) {
        request.post({
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            url: 'http://horarios.renfe.com/cer/hjcer310.jsp',
            form: { nucleo:'10',
                        i:'s',
                        cp:'NO',
                        o:'60101',
                        d:'18000',
                        df: '20180617',
                        ho: '18',
                        hd: '19',
                        TXTInfo: '' }
        }, function (error, response, body) {
            cb(body);
        });
    }
}

module.exports = plugin_renfe;