const plugin = require('../plugin');
const request = require('request');
const showdown  = require('showdown');
const converter = new showdown.Converter();

class prodNews extends plugin {
    constructor(config, queue) {
        super(config, queue);
    }
    
    fire() {
        let self = this;
        self.data = self.config;

        let call = this.call_api();
        call.then(function(result) {
            self.data.data = result;
            self.queue.push(self);
        }, function (err) {
            console.log("An error occurred: ", err);
        });
    }

    call_api() {
        let config = this.config;
        let options = {
            uri: "/merge_requests?state=merged&view=simple&labels=Prod News&target_branch=prod&scope=all",
            baseUrl: config.host + config.url_resource.prefix + config.url_resource.version,
            headers: {
                "PRIVATE-TOKEN": config.access_token
            },
            json: true
        };

        return new Promise(function(resolve, reject) {
            request(options, (err, res, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(prodNews.treat_response(body));
                }
            });
        });
    }

    static treat_response(results) {
        if (Array.isArray(results)) {
            results.sort(function (a, b) {
                let aDate = new Date(a.updated_at);
                let bDate = new Date(b.updated_at);
                if (aDate < bDate) {
                    return -1;
                } else if (aDate > bDate) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }

        const english = new Intl.DateTimeFormat('en');
        let merge_requests = [];
        let result = [];
        for (let i = 0; i < results.length; i++) {
            result = results[i];
            result.description = converter.makeHtml(results[i].description);
            let updated_at = new Date(results[i].updated_at);
            result.updated_at = english.format(updated_at);
            merge_requests.push([result]);
        }
        return merge_requests;
    }
}

module.exports = prodNews;
