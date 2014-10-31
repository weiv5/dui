define([
    "../../core",
    "./header",
    "./body"
], function(Core, Header, Body) {
    function Table() {
        this.init.apply(this, arguments);
    }
    Table.prototype = {
        init : function(boxId, option) {
            var me = this;
            me.box = Core.dom.get(boxId);
            if (me.box === null) {
                Core.error(1);
            }
            me.dom = new Core.dom("table");
            me.header = new Header(me, option.field);
            me.body = new Body(me, option);
        },
        render : function() {
            var me = this;
            me.header.render();
            me.body.render();
            me.box.append(me.dom);
        },
        append : function(child) {
            this.dom.append(child);
        },
        sort : function(col, order) {
            console.log(col, order);
        },
    };
    Core.extend({
        table : Table
    });
    return Core;
});
