define([
    "../../core"
], function(Dui) {
    function Body() {
        this.init.apply(this, arguments);
    }
    Body.prototype = {
        init : function(box, option) {
            var me = this;
            me.box = box;
            me.field = [];
            me.data = [];
            me.groupData = [];
            me.groupMap = [];
            me.sum = {};

            var isGroup = option.dataGroup || false;
            var isSum = false;
            for (var i in option.field) {
                me.field.push({
                    numSwitch : option.field[i].numSwitch || false
                });
                if (option.field.isSum || false) {
                    isSum = true;
                }
            }
            var tmpMap = [];
            var counter = 0;
            for (var i in option.data) {
                me.data.push(me.formatRow(option.field, option.data[i]));
                if (isGroup || isSum) {
                    if (isGroup) {
                        var gField = option.field[option.dataGroup.fieldIndex].name;
                        var gValue = option.data[i][option.dataGroup.dataIndex];
                        var idx = tmpMap.indexOf(gValue);
                        if (idx < 0) {
                            tmpMap.push(gValue);
                            idx = gValue.length-1;
                            me.groupData[idx] = {};
                            me.groupMap[idx] = [];
                            me.groupData[idx][gField] = gValue;
                        }
                        me.groupMap[idx].push(counter);
                    }
                    for (var j in option.data[i]) {
                        if (!Dui.isNumber(option.data[i][j])) {
                            continue;
                        }
                        if (isSum) {
                            me.sum[j] = me.sum[j] || 0;
                            me.sum[j] += option.data[i][j];
                        }
                        if (isGroup) {
                            me.groupData[idx][j] = me.groupData[idx][j] || 0;
                            me.groupData[idx][j] += option.data[i][j];
                        }
                    }
                }
                counter++;
            }
        },
        render : function() {
        },
        formatRow : function(field, data) {
            var row = [];
            for (var i in field) {
                var num = Dui.var.defaultVar;
                if (typeof field[i].formula === "function") {
                    num = field[i].formula(data);
                } else if (typeof data[field[i].dataIndex] !== "undefined") {
                    num = data[field[i].dataIndex];
                }
                var format = num;
                if (typeof field[i].format === "function") {
                    format = field[i].format(num);
                }

                var cell = {show: format};
                if (field.numSwitch || false) {
                    cell.num = num;
                }
                row.push(cell);
            });
            return row;
        },
        sort : function(idx, order) {
        },
        bindEvent : function() {
        },
    };
});
