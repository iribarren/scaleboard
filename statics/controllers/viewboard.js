"use strict"

class Viewboard {
    constructor() {
        this.templateEngine = Handlebars;
    }

    render(data) {
        var plugin_id = data.id;
        var template_src = data.template;
        var plugin_name = data.name;
        var data_set = data.data;
        var data_set_interval = data.data_interval;

        var self = this;
        $.get(template_src, function(html) {
            var template = self.templateEngine.compile(html);
            var i = 0;
            window.timer = setInterval(function() {
                console.log(data_set);
                var data_interval = {
                    id: plugin_id,
                    name: plugin_name,
                    data: data_set[i % data_set.length],
                    template: template
                }
                self.renderInterval(data_interval, i++ % data_set.length);
            }, data_set_interval * 1000);
        });
    }

    renderInterval(data_interval) {
        console.log(data_interval);
        var rendered_html = data_interval.template(data_interval);
        $("#viewboard").html(rendered_html);
    }
}