define([
    "../../core",
    "./toolbar/toolbar",
    "./content/content",
    "./footer"
], function(Core, Toolbar, Content, Footer) {
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
            me.box = new Core.dom("div");
            me.box.addClass(Core.css.table.box);

            me.toolbar = new Toolbar(me, option);
            me.content = new Content(option);
            me.footer = new Footer(me, option);

            me.render();
        },
        render : function() {
            var me = this;
            me.toolbar.render(me.box);
            me.content.render(me.box);
            me.footer.render(me.box);
            me.outer.append(me.box);
        }
    };
    Core.extend({
        table : Table
    });
    return Core;
});
