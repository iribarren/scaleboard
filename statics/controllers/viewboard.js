"use strict";

class Viewboard {
    constructor() {
        this.templateEngine = Handlebars;
        this.timer = undefined;
    }

    render(data) {
        let room_num = data.queue;
        let plugin_id = data.id;
        let template_src = data.template;
        let plugin_name = data.name;
        let data_set = data.data;
        let data_set_interval = data.data_interval;

        let self = this;
        $.get(template_src, function(html) {
            let template = self.templateEngine.compile(html);
            let i = 0;
            self.timer = setInterval(function() {
                let data_interval = {
                    id: plugin_id,
                    name: plugin_name,
                    data: data_set[i++ % data_set.length]
                };
                Viewboard.renderInterval(data_interval, template, room_num);
            }, data_set_interval * 1000);
        });
    }

    static renderInterval(data_interval, template, room_num) {
        let rendered_html = template(data_interval);
        $("#viewboard-"+room_num).html(rendered_html);
    }
}
