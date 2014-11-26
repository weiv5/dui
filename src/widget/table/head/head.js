define([
    "../../../core",
    "./thead",
    "../toolbar/toolbar"
], function(Core, Thead, Toolbar) {
    function Head() {
        this.init.apply(this, arguments);
    }
    Head.prototype = {
        init : function(table, option) {
            var me = this;
            me.table = table;
            me.fixed = false;
            me.top = 0;
            if (typeof option.head !== "undefined") {
                me.top = option.head.top || 0;
                me.fixed = option.head.fixed || false;
            }

            me.toolbar = new Toolbar(table, option);
            me.thead = new Thead(table, option);
        },
        render : function(box) {
            var me = this;
            me.box = new Core.dom("div");
            me.box.addClass(Core.css.table.header);
            me.box.css({width: me.table.xtbl.width()});
            box.prepend(me.box);

            me.toolbar.render(me.box);
            me.thead.render(me.box);
            me.bindEvent();
        },
        bindEvent : function() {
            var me = this;
            if (!me.fixed) {
                return;
            }
            var doc = Core.dom.get(document),
                show = me.box.top()-me.top,
                hide = me.box.top(),
                left = me.table.xtbl.left(),
                htop = me.top,
                btop = me.box.height();
            console.log(btop);
            doc.bind("scroll", function() {
                var t = doc.scrollTop(),
                    h = hide + me.table.box.height();
                if (t >= show && t < h) {
                    me.box.css({position: "fixed", top: htop});
                    me.table.xtbl.css({"margin-top": btop});
                } else {
                    me.box.css({position: ""});
                    me.table.xtbl.css({"margin-top": 0});
                }
            });
        },
    };
    return Head;
});
