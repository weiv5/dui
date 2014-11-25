define([
    "../../../core",
    "./numSwitch",
    "./bigfont"
],function(Core, NumSwitch, Bigfont) {
    var Toolbar = function() {
        this.init.apply(this, arguments);
    }

    Toolbar.prototype = {
        init : function(table, option) {
            var me = this;

            me.table = table;
            me.box = new Core.dom("div");
            me.box.addClass(Core.css.table.toolbar).hide();
            me.show = false;
            me.closeT = null;

            me.bigfont = new Bigfont(table);
            me.numSwitch = new NumSwitch(table, option.field);
        },
        render : function(box) {
            var me = this;
            me.bigfont.render(me.box);
            me.numSwitch.render(me.box);
            me.box.bind("mouseenter", function() {
                me.show = true;
            });
            me.box.bind("mouseleave", function() {
                me.closeBar();
                me.show = false;
            });
            me.table.box.bind("mouseenter", function() {
                me.showBar();
                me.show = true;
            });
            me.table.box.bind("mouseleave", function() {
                me.closeBar();
                me.show = false;
            });
            box.append(me.box);
        },
        showBar : function() {
            var me = this,
                t = me.table.box.top()-me.box.height(),
                l = me.table.box.left()+me.table.box.width()-me.box.width()-Core.var.toolbar.right;
            me.box.css({top:t, left:l}).show();
        },
        closeBar : function() {
            var me = this;
            clearTimeout(me.closeT);
            me.closeT = setTimeout(function(){
                if (!me.show) {
                    me.box.hide();
                }
            }, 300);
        }
    };
    return Toolbar;
});
