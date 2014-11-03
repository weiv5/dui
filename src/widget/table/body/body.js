define([
    "../../../core",
    "./lineal",
    "./grouped"
], function(Core, Lineal, Grouped) {
    function Body() {
        this.init.apply(this, arguments);
    }
    Body.prototype = {
        init : function(box, option) {
            var me = this;
            me.box = box;
            me.tbody = new Core.dom("tbody");
            me.impl = null;
            me.numSwitch = "format";
            
            var sum = {
                    text : Core.var.sum.text,
                    valign : Core.var.sum.valign.bottom,
                    fieldIndex : 0,
                    is : false
                },
                group = {
                    fieldIndex : null,
                    dataIndex : null
                },
                field = [];

            if (Core.isObject(option.sum)) {
                sum.text = option.sum.text || sum.text;
                sum.valign = option.sum.valign || sum.valign;
                sum.fieldIndex = option.sum.fieldIndex || sum.fieldIndex;
            }

            for (var i in option.field) {
                var f = {
                    numSwitch : option.field[i].numSwitch || false,
                    format : option.field[i].format || false,
                    formula : option.field[i].formula || false,
                    dataIndex : option.field[i].dataIndex,
                    isSum : option.field[i].isSum || false
                };
                field.push(f);
                if (f.isSum) {
                    sum.is = true;
                }
            }
            if (sum.is) {
                field[sum.fieldIndex].isSum = true;
            }

            var isGroup = false;
            if (Core.isObject(option.dataGroup)) {
                var fieldIndex = option.dataGroup.fieldIndex || 0;
                if (Core.isNumber(fieldIndex) && Core.isString(option.dataGroup.dataIndex) && Core.isObject(option.field[fieldIndex])) {
                    isGroup = true;
                    group.fieldIndex = option.field[fieldIndex].dataIndex;
                    group.dataIndex = option.dataGroup.dataIndex;
                }
            }

            var conf = {
                field : field, 
                sum : sum,
                data : option.data
            };
            if (isGroup) {
                conf.group = group;
                me.impl = new Grouped(conf);
            } else {
                me.impl = new Lineal(conf);
            }
        },
        render : function() {
            var me = this;
            /*
            me.tbody.bind("click", function() {
                me.numSwitch = me.numSwitch=="format" ? "num" : "format";
                me.impl.numSwitch(me.numSwitch);
            });
            */
            me.impl.render(me.tbody);
            me.box.append(me.tbody);
        },
        sort : function(idx, order) {
            var me = this;
            me.impl.sort(idx, order);
            me.tbody.empty();
            me.impl.render(me.tbody);
        },
    };
    return Body;
});
