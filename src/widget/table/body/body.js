define([
    "../../../core",
    "./lineal",
    "./grouped"
], function(Core, Lineal, Grouped) {
    function Body() {
        this.init.apply(this, arguments);
    }
    Body.prototype = {
        init : function(table, option) {
            var me = this;
            me.table = table;
            me.colgroup = new Core.dom("colgroup");
            me.tbody = new Core.dom("tbody");
            me.impl = null;
            
            var sum = {
                    text : Core.var.sum.text,
                    valign : Core.var.valign.bottom,
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
                    isSum : option.field[i].isSum || false,
                    dataClass : option.field[i].dataClass || false,
                    align : option.field[i].align || "right",
                };
                var col = new Core.dom("col");
                me.colgroup.append(col.attr("width", option.field[i].width || 100));

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
                if (Core.isNumber(fieldIndex) && Core.isString(option.dataGroup.dataIndex) && Core.isObject(option.field[fieldIndex]) && option.dataGroup.dataIndex) {
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
        render : function(box) {
            var me = this;
            box.append(me.colgroup);
            box.append(me.tbody);
            me.impl.render(me.tbody);
        },
        sort : function(idx, order) {
            var me = this;
            me.impl.sort(idx, order);
            me.impl.render(me.tbody);
        },
        numSwitch : function(stat) {
            this.impl.numSwitch(stat);
        },
        light : function(idx) {
            this.impl.light(idx);
        },
        lightOff : function(idx) {
            this.impl.lightOff(idx);
        },
    };
    return Body;
});
