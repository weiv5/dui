define([
    "dom/dom", 
    "table/field", 
    "table/colgroup", 
    "table/thead",
    "table/tbody",
    "table/data"
], function(Dom, Field, Colgroup, Thead, Tbody, Data) {
    function Table() {
        this.init.apply(this, arguments);
    }
    Table.prototype = {
        init : function(container, option) {
            var me = this;
            me.container = container;
            me.title = option.title || "",
            me.dataGroup = option.dataGroup || false,
            me.field = new Field(option.field);
            me.data = new Data(me, option.data);

            me.table = new Dom("table");
            me.colgroup = new Colgroup(me);
            me.thead = new Thead(me);
            me.tbody = new Tbody(me);
        },
        append : function(obj) {
            var me = this;
            me.table.append(obj);
        },
        render : function() {
            var me = this;
            me.colgroup.render();
            me.thead.render();
            me.tbody.render();
            me.table.render(me.container);
        },
    };
    return Table;
});
