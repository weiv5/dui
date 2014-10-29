define(function() {

function Field() {
    this.init.apply(this, arguments);
}
Field.prototype = {
    init : function(option) {
        var me = this;
        me.children = [];
        me.fieldGroup = null;
        for (var i in option) {
            var f = {};
            f.text = option[i].text || "";
            f.dataIndex = option[i].dataIndex || 0;
            f.width = option[i].width || 100;
            f.format = option[i].format || false;
            f.formula = option[i].formula || false;
            f.formatSwitch = option[i].formatSwitch || false;
            f.sort = option[i].sort || false;
            f.sum = option[i].sum || false;
            f.fieldGroup = option[i].fieldGroup || false;
            if (f.fieldGroup !== false) {
                me.fieldGroup = me.fieldGroup || {};
                if (typeof me.fieldGroup[f.fieldGroup] !== "undefined") {
                    me.fieldGroup[f.fieldGroup]++;
                } else {
                    me.fieldGroup[f.fieldGroup] = 1;
                }
            }
            me.children.push(f);
        }
    },
    each : function(iterator) {
        var me = this;
        for (var i in me.children) {
            iterator(i, me.children[i]);
        }
    }
};
return Field;

});
