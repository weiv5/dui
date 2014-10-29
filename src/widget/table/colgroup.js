define(["dom/dom"], function(Dom) {
    function Colgroup() {
        this.init.apply(this, arguments);
    }
    Colgroup.prototype = {
        init : function(table) {
            var me = this;
            me.table = table;
            me.colgroup = new Dom("colgroup");
            me.table.field.each(function(k, v) {
                var col = new Dom("col");
                col.css({width: v.width});
                me.colgroup.append(col);
            });
        },
        render : function() {
            var me = this;
            me.table.append(me.colgroup);
        },
    };
    return Colgroup;
});
