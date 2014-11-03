define([
    "../../core",
    "./func"
], function(Core, Func) {
    function Grouped() {
        this.init.apply(this, arguments);
    }
    Grouped.prototype = {
        init : function(option) {
            var me = this;
            me.field = option.field;
            me.data = [];
            me.group = option.group;
            me.isSum = option.isSum;
            me.sum = {};
            me.sumPosition = option.sumPosition;

            var tmpMap = [],
                sum = {};
            for (var i in option.data) {
                var gValue = option.data[i][me.group.dataIndex];
                var idx = tmpMap.indexOf(gValue);
                if (idx < 0) {
                    tmpMap.push(gValue);
                    idx = tmpMap.length-1;
                    me.data[idx] = {row: {}, sub : [], open : false};
                    me.data[idx].row[me.group.fieldIndex] = gValue;
                }

                var row = Func.formatRow(option.data[i], me.field);
                me.data[idx].sub.push({row: row});

                for (var j in option.data[i]) {
                    if (!Core.isNumber(option.data[i][j])) {
                        continue;
                    }
                    if (j !== me.group.fieldIndex) {
                        me.data[idx].row[j] = me.data[idx].row[j] || 0;
                        me.data[idx].row[j] += option.data[i][j];
                    }
                    if (me.isSum && Core.isNumber(option.data[i][j])) {
                        sum[j] = sum[j] || 0;
                        sum[j] += option.data[i][j];
                    }
                }
                if (me.isSum) {
                    me.sum.row = Func.formatSum(sum, me.field);
                }
            }
        },
        render : function(box) {
            var me = this;
            for (var i in me.data) {
                var row = Func.formatRow(me.data[i].row, me.field);
                me.data[i].row = row;
                var tr = Func.createTr(row);
                me.data[i].dom = tr;
                box.append(tr);
                for (var j in me.data[i].sub) {
                    var tr2 = Func.createTr(me.data[i].sub[j].row);
                    me.data[i].sub[j].dom = tr2.hide();
                    box.append(tr2);
                }
                me.bindOpenEvent(i);
            }
            if (me.isSum) {
                me.sum.dom = Func.createTr(me.sum.row);
                if (me.sumPosition === "top") {
                    box.prepend(me.sum.dom);
                } else {
                    box.append(me.sum.dom);
                }
            }
        },
        rerender : function(box) {
            var me = this;
            for (var i in me.data) {
                box.append(me.data[i].dom);
                for (var j in me.data[i].sub) {
                    if (me.data[i].open) {
                        me.data[i].sub[j].dom.show();
                    } else {
                        me.data[i].sub[j].dom.hide();
                    }
                    box.append(me.data[i].sub[j].dom);
                }
                me.bindOpenEvent(i);
            }
            if (me.isSum) {
                if (me.sumPosition === "top") {
                    box.prepend(me.sum.dom);
                } else {
                    box.append(me.sum.dom);
                }
            }
        },
        sort : function(idx, order) {
            var me = this;
            Func.sortTr(me.data, idx, order);
            for (var i in me.data) {
                Func.sortTr(me.data[i].sub, idx, order);
            }
        },
        numSwitch : function(f) {
            var me = this;
            for (var i in me.data) {
                if (!me.field[i].numSwitch) {
                    continue;
                }
                for (var j in me.data) {
                    me.data[j].dom.children(i).text(me.data[j].row[i][f]);
                    for (var k in me.data[j].sub) {
                        me.data[j].sub[k].dom.children(i).text(me.data[j].sub[k].row[i][f]);
                    }
                }
            }
        },
        bindOpenEvent : function(idx) {
            var me = this;
            me.data[idx].dom.bind("click", function(e) {
                me.data[idx].open = me.data[idx].open==false ? true : false;
                for (var j in me.data[idx].sub) {
                    if (me.data[idx].open) {
                        me.data[idx].sub[j].dom.show();
                    } else {
                        me.data[idx].sub[j].dom.hide();
                    }
                }
            });
        },
    };
    return Grouped;
});
