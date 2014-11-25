define([
    "../../core",
    "./toolbar/toolbar",
    "./head/head",
    "./body/body"
], function(Core, Toolbar, Head, Body) {
    function Table() {
        this.init.apply(this, arguments);
    }
    Table.prototype = {
        init : function(outerId, option) {
            var me = this;
            me.outer = Core.dom.get(outerId);
            if (me.outer === null) {
                Core.error(1);
            }

            me.realwidth = option.realwidth || false;
            me.createBox();

            me.toolbar = new Toolbar(me, option);
            me.head = new Head(me, option);
            me.body = new Body(me, option);

            me.render();
        },
        render : function() {
            var me = this;
            me.toolbar.render(Core.dom.get("body"));
            me.head.render(me.box);
            me.body.render(me.box);
        },
        createBox : function() {
            var me = this,
                outer = new Core.dom("div");
            outer.addClass(Core.css.table.box);
            if (me.realwidth) {
                outer.addClass(Core.css.table.realwidth);
            }
            me.box = new Core.dom("table");
            outer.append(me.box);
            me.outer.append(outer);
        },
    };
    Core.extend({
        table : Table
    });
    return Core;
});
