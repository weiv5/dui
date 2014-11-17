define([
    "../../../core",
    "./numSwitch"
],function(Core, NumSwitch) {
    var Toolbar = function() {
        this.init.apply(this, arguments);
    }

    Toolbar.prototype = {
        init : function(table, option) {
            var me = this;

            me.box = new Core.dom("div");
            me.box.addClass(Core.css.table.toolbar);

            me.numSwitch = new NumSwitch(table, option.field);
        },
        render : function(box) {
            var me = this;
            me.numSwitch.render(me.box);
            box.append(me.box);
        },
    };
    return Toolbar;
});
