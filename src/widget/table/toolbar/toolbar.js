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

            me.box = new Core.dom("div");
            me.box.addClass(Core.css.table.toolbar);

            me.bigfont = new Bigfont(table);
            me.numSwitch = new NumSwitch(table, option.field);
        },
        render : function(box) {
            var me = this;
            me.bigfont.render(me.box);
            me.numSwitch.render(me.box);
            box.append(me.box);
        },
    };
    return Toolbar;
});
