define([
    "../../core"
], function(Core) {
    function Grouped() {
        this.init.apply(this, arguments);
    }
    Grouped.prototype = {
        init : function(box, option) {
            var me = this;
            me.box = box;
            me.field = [];
            me.data = [];
            me.groupData = [];
            me.sum = {row:[]};
            me.isGroup = false;
            me.isSum = false;

            if (Core.isObject(option.dataGroup)) {
                option.dataGroup.fieldIndex = option.dataGroup.fieldIndex = 0;
                if (Core.isNumber(option.dataGroup.fieldIndex) 
                    && Core.isString(option.dataGroup.dataIndex)
                    && typeof option.field[option.dataGroup.fieldIndex]!=="undefined") {
                    me.isGroup = true;
                }
            }
            for (var i in option.field) {
                var f = {
                    numSwitch : option.field[i].numSwitch || false,
                    format : option.field[i].format || false,
                    formula : option.field[i].formula || false,
                    dataIndex : option.field[i].dataIndex,
                    isSum : option.field[i].isSum || false
                };
                me.field.push(f);
                if (f.isSum) {
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
                        if (!Core.isNumber(option.data[i][j])) {
                            continue;
                        }
                        if (me.isSum) {
                            me.sum.data[j] = me.sum.sum[j] || 0;
                            me.sum.data[j] += option.data[i][j];
                        }
                        if (me.isGroup && j!==gField) {
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
            var tbody = new Core.dom("tbody");
            if (me.isGroup) {
                for (var i in me.groupData) {
                    var tr = new Core.dom("tr");
                    var row = me.formatRow(me.groupData[i].data);
                    me.groupData[i].row = row;
                    for (var j in row) {
                        var td = new Core.dom("td");
                        td.text(row[j].format);
                        tr.append(td);
                    }
                    me.groupData[i].dom = tr;
                    tbody.append(tr);
                }
            } else {
                for (var i in me.data) {
                    var tr = new Core.dom("tr");
                    for (var j in me.data[i].row) {
                        var td = new Core.dom("td");
                        td.text(me.data[i].row[j].format);
                        tr.append(td);
                    }
                    me.data[i].dom = tr;
                    tbody.append(tr);
                }
            }
            me.box.append(tbody);
        },
        sort : function(idx, order) {
        },
        numSwitch : function() {
        },
    };
    return Grouped;
});
