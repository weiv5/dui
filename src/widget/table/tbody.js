define([
    "dom/dom", 
    "format"
], function(Dom, Format) {

    function Tbody() {
        this.init.apply(this, arguments);
    }
    Tbody.prototype = {
        init : function(table) {
            var me = this;
            me.table = table;
            me.tbody = new Dom("tbody");
            for (var i in me.table.data.data) {
                var row = new Dom("tr");
                for (var j in me.table.data.data[i]) {
                    var td = new Dom("td");
                    td.text(me.table.data.data[i][j].format);
                    row.append(td);
                }
                me.tbody.append(row);
            }
        },
        render : function() {
            var me = this;
            me.table.append(me.tbody);
        }
    };
    return Tbody;

});
