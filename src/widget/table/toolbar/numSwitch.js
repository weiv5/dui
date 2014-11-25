define([
    "../../../core"
],function(Core) {
    var NumSwitch = function() {
        this.init.apply(this, arguments);
    }

    NumSwitch.prototype = {
        init : function(table, field) {
            var me = this;
            me.table = table;
            me.isSwitch = false;
            me.switchStat = "format";
            for (var i in field) {
                if (field[i].numSwitch || false) {
                    me.isSwitch = true;
                    break;
                }
            }
        },
        render : function(box) {
            var me = this,
                dom = new Core.dom("span");
            dom.addClass(Core.css.table.numswitch.icon);
            dom.bind("click", function() {
                me.switchStat = me.switchStat == "num" ? "format" : "num";
                me.table.body.numSwitch(me.switchStat);
            });
            box.append(dom);
        },
    };
    return NumSwitch;
});
