define([
    "../../core",
    "./head",
    "./body"
], function(Core, Head, Body) {
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
            me.head = new Head(me, option.field);
            me.body = new Body(me, option);
        },
        render : function() {
            var me = this;
            me.head.render();
            me.body.render();
            me.box.append(me.dom);
        },
        append : function(child) {
            this.dom.append(child);
        },
        sort : function(col, order) {
            this.body.sort(col, order);
        },
    };
    Core.extend({
        table : Table
    });
    return Core;
});
