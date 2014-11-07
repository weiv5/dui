define([
    "../../core",
    "./head",
    "./body/body",
    "./toolbar/toolbar"
], function(Core, Head, Body, Toolbar) {
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
            me.dom = {};

            me.dom.toolbar = new Core.dom("div");
            me.dom.table = new Core.dom("table");

            me.toolbar = new Toolbar(me, option.field);
            me.head = new Head(me, option.field);
            me.body = new Body(me, option);
        },
        render : function() {
            var me = this;
            me.toolbar.render(me.dom.toolbar);
            me.head.render(me.dom.table);
            me.body.render(me.dom.table);

            me.box.append(me.dom.toolbar);
            me.box.append(me.dom.table);
        }
    };
    Core.extend({
        table : Table
    });
    return Core;
});
