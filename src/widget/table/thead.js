define(["dom/dom"], function(Dom) {

function Thead() {
    this.init.apply(this, arguments);
}
Thead.prototype = {
    init : function(table) {
        var me = this;
        me.table = table;
        me.thead = new Dom("thead");
        me.fieldGroup = new Dom("tr");
        me.title = new Dom("tr");
        me.table.field.each(function(k, v) {
            if (me.table.field.fieldGroup !== null) {
                var th = new Dom("th");
                if (v.fieldGroup) {
                    if (me.table.field.fieldGroup[v.fieldGroup]) {
                        th.text(v.fieldGroup);
                        th.attr("colspan", me.table.field.fieldGroup[v.fieldGroup]);
                        me.fieldGroup.append(th);
                        me.table.field.fieldGroup[v.fieldGroup] = 0;
                    }
                    
                    var th = new Dom("th");
                    th.text(v.text);

                    if (v.sort) {
                        th.bind("click", function() {
                            alert(v.text);
                        });
                    }

                    me.title.append(th);
                } else {
                    th.text(v.text);
                    th.attr("rowspan", 2);
                    me.fieldGroup.append(th);
                }
            } else {
                var th = new Dom("th");
                th.text(v.text);
                me.title.append(th);
            }
        });
        if (me.fieldGroup.length > 0) {
            me.thead.append(me.fieldGroup);
        }
        me.thead.append(me.title);
    },
    render : function() {
        var me = this;
        me.table.append(me.thead);
    }
};
return Thead;

});
