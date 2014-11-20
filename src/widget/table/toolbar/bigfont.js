define([
    "../../../core"
],function(Core) {
    var Bigfont = function() {
        this.init.apply(this, arguments);
    }

    Bigfont.prototype = {
        init : function(table, field) {
            var me = this;
            me.table = table;
            me.isBig = false;
        },
        render : function(box) {
            var me = this,
                dom = new Core.dom("span");
            dom.addClass(Core.css.table.bigfont.icon);
            dom.bind("click", function() {
                me.isBig = me.isBig ? false : true;
                if (me.isBig) {
                    me.table.box.addClass(Core.css.table.bigfont.biger);
                } else {
                    me.table.box.removeClass(Core.css.table.bigfont.biger);
                }
            });
            box.append(dom);
        },
    };
    return Bigfont;
});
