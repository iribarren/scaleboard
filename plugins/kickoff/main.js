const plugin = require('../plugin');

class plugin_name {

    constructor(config, queue) {
        this.config = config;
        this.queue = queue;
    }
    
    fire() {
        let spanish_data = "<p>Ignacio Gonzalez e Isabel Piñón  serán los encargados de pasar lista y asegurarse de que todos llegáis a destino.</p><ul><li>17:30: Subida a los buses</li><li>17:50: Salida de Scalefast hacia  el CBA </li><li>18:20: Llegada al CBA </li><li>18:45 Meeting en Sala Valle Inclán  </li><li>20:30- 00:00  Terraza queda privatizada en exclusiva para nosotros   </li><li>20:30-22:30 Cóctel Reina con refrescos y vinos/cervezas</li><li>21:30 -00:30  barra libre!</li><li>00:00 – cierre Apertura de una parte de la terraza Suecia al público, dejando la zona de la barra privatizada para nosotros</li></ul>        <p>Para los que vayáis en coche, tened en cuenta que el CBA NO dispone de parking.</p>";
        let english_data = "<p>Ignacio Gonzalez and Isabel Piñon will take care of everybody getting into the busses.</p><ul><li>17:30: Get on the buses</li><li>17:50: Departure from Scalefast to CBA </li><li>18:20: Arrival CBA </li><li>18:45 Meeting in Valle Inclán room </li><li>20:30- 00:00  Suecia terrace in exclusive for Scalefast   </li><li>20:30-22:30 Cóctel Reina beer, wine and beverages</li><li>21:30 -00:30  Open bar!</li><li>00:00 – close Aperture of the Suecia terrace for the public.</li></ul><p>For those going by car, REMEMBER the CBA does not have private parking</p>";
        
        this.data = this.config;
        this.data.data = [spanish_data, english_data];
        this.queue.push(this);
    }
}

module.exports = plugin_name;