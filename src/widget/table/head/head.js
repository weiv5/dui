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
                me.fixed = option.head.fixed || false;
                me.top = option.head.top || 0;
            }

            me.toolbar = new Toolbar(table, option);
            me.thead = new Thead(table, option);
        },
        render : function(box) {
            var me = this;
            me.box = new Core.dom("div");
            me.box.addClass(Core.css.table.header);

            me.toolbar.render(me.box);
            me.thead.render(me.box);
            box.prepend(me.box);
            me.bindEvent();
        },
        bindEvent : function() {
            var me = this;
            if (!me.fixed) {
                return;
            }
            var doc = Core.dom.get(document),
                show = me.box.top(),
                hide = me.box.top() + me.top;
                left = me.table.xtbl.left(),
                htop = me.top,
                btop = me.box.height() + me.top;
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
