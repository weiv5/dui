define([
    "../../core",
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
            
            var field = [],
                isSum = false;
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
                    isSum = true;
                }
            }

            var isGroup = false,
                groupInfo = {};
            if (Core.isObject(option.dataGroup)) {
                var fieldIndex = option.dataGroup.fieldIndex || 0;
                if (Core.isNumber(fieldIndex) && Core.isString(option.dataGroup.dataIndex) && Core.isObject(option.field[fieldIndex])) {
                    isGroup = true;
                    groupInfo = {
                        fieldIndex : option.field[fieldIndex].dataIndex,
                        dataIndex : option.dataGroup.dataIndex
                    }
                }
            }

            var sumPosition = "bottom";
            if (Core.isObject(option.style)) {
                sumPosition = option.style.sumPosition || sumPosition;
            }
            var conf = {
                field : field, 
                isSum : isSum,
                sumPosition : option.style.sumPosition,
                data : option.data
            };
            if (isGroup) {
                conf.group = groupInfo;
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
            me.impl.rerender(me.tbody);
        },
    };
    return Body;
});
