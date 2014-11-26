define([
    "../../core",
    "./head/head",
    "./body/body"
], function(Core, Head, Body) {
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

            me.head = new Head(me, option);
            me.body = new Body(me, option);

            me.render();
        },
        render : function() {
            var me = this;
            me.head.render(me.xtbl);
            me.body.render(me.box);
        },
        createBox : function() {
            var me = this;

            var container = me.createTblDom();
            me.outer.append(container.xtbl);
            me.xtbl = container.xtbl;
            me.box = container.box;
        },
        createTblDom : function() {
            var me = this,
                xtbl = new Core.dom("div"),
                content = new Core.dom("div"),
                box = new Core.dom("table");

            xtbl.addClass(Core.css.table.box);
            xtbl.append(content);
            if (me.realwidth) {
                xtbl.addClass(Core.css.table.realwidth);
            }

            content.addClass(Core.css.table.content);
            content.append(box);

            return {xtbl:xtbl, box:box};
        }
    };
    Core.extend({
        table : Table
    });
    return Core;
});
