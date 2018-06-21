"use strict";

class Viewboard {
    constructor() {
        this.templateEngine = Handlebars;
    }

    render(data) {
        let plugin_id = data.id;
        let template_src = data.template;
        let plugin_name = data.name;
        let data_set = data.data;
        let data_set_interval = data.data_interval;

        let self = this;
        $.get(template_src, function(html) {
            let template = self.templateEngine.compile(html);
            let i = 0;
            window.timer = setInterval(function() {
                let data_interval = {
                    id: plugin_id,
                    name: plugin_name,
                    data: data_set[i % data_set.length],
                    template: template
                };
                Viewboard.renderInterval(data_interval, i++ % data_set.length);
            }, data_set_interval * 1000);
        });
    }

    static renderInterval(data_interval) {
        let rendered_html = data_interval.template(data_interval);
        $("#viewboard-1").html(rendered_html);
    }
}