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
            me.sum = {row:[]};
            me.isGroup = option.dataGroup || false;
            me.isSum = false;

            for (var i in option.field) {
                me.field.push({
                    numSwitch : option.field[i].numSwitch || false,
                    format : option.field[i].format || false,
                    formula : option.field[i].formula || false,
                    dataIndex : option.field[i].dataIndex
                });
                if (option.field.isSum || false) {
                    me.isSum = true;
                }
            }
            var tmpMap = [];
            var counter = 0;
            for (var i in option.data) {
                me.data.push({row: me.formatRow(option.data[i])});
                if (me.isGroup || me.isSum) {
                    if (me.isGroup) {
                        var gField = option.field[option.dataGroup.fieldIndex].dataIndex;
                        var gValue = option.data[i][option.dataGroup.dataIndex];
                        var idx = tmpMap.indexOf(gValue);
                        if (idx < 0) {
                            tmpMap.push(gValue);
                            idx = tmpMap.length-1;
                            me.groupData[idx] = {data: {}, sub : []};
                            me.groupData[idx].data[gField] = gValue;
                            me.groupData[idx].sub.push(counter);
                        }
                    }
                    for (var j in option.data[i]) {
                        if (!Dui.isNumber(option.data[i][j])) {
                            continue;
                        }
                        if (me.isSum) {
                            me.sum.data[j] = me.sum.sum[j] || 0;
                            me.sum.data[j] += option.data[i][j];
                        }
                        if (me.isGroup) {
                            me.groupData[idx].data[j] = me.groupData[idx].data[j] || 0;
                            me.groupData[idx].data[j] += option.data[i][j];
                        }
                    }
                }
                counter++;
            }
        },
        render : function() {
            var me = this;
            var tbody = new Dui.dom("tbody");
            if (me.isGroup) {
                for (var i in me.groupData) {
                    var tr = new Dui.dom("tr");
                    var row = me.formatRow(me.groupData[i].data);
                    me.groupData[i].row = row;
                    for (var j in row) {
                        var td = new Dui.dom("td");
                        td.text(row[j].format);
                        tr.append(td);
                    }
                    me.groupData[i].dom = tr;
                    tbody.append(tr);
                }
            } else {
                for (var i in me.data) {
                    var tr = new Dui.dom("tr");
                    for (var j in me.data[i].row) {
                        var td = new Dui.dom("td");
                        td.text(me.data[i].row[j].format);
                        tr.append(td);
                    }
                    me.data[i].dom = tr;
                    tbody.append(tr);
                }
            }
            me.box.append(tbody);
        },
        formatRow : function(data) {
            var me = this;
            var row = [];
            for (var i in me.field) {
                var num = Dui.var.defaultVar;
                if (typeof me.field[i].formula === "function") {
                    num = me.field[i].formula(data);
                } else if (typeof data[me.field[i].dataIndex] !== "undefined") {
                    num = data[me.field[i].dataIndex];
                }
                var format = num;
                if (typeof me.field[i].format === "function") {
                    format = me.field[i].format(num);
                }
                row.push({format: format, num: num});
            }
            return row;
        },
        sort : function(idx, order) {
        },
        bindEvent : function() {
        },
    };
    return Body;
});
