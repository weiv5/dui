define([
    "../../../core",
    "./head",
    "./body"
],function(Core, Head, Body) {
    function Content() {
        this.init.apply(this, arguments);
    }
    Content.prototype = {
        init : function(option) {
            var me = this;
            
            me.box = new Core.dom("div");
            me.box.addClass(Core.css.table.content);
            me.table = new Core.dom("table");

            me.head = new Head(me, option.field);
            me.body = new Body(me, option);
        },
        render : function(box) {
            var me = this;
            me.head.render(me.table);
            me.body.render(me.table);

            me.box.append(me.table);
            box.append(me.box);
        },
    };
    return Content;
});
