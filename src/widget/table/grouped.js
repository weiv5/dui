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

            var tmpMap = [];
            for (var i in option.data) {
                var gValue = option.data[i][me.group.dataIndex];
                var idx = tmpMap.indexOf(gValue);
                if (idx < 0) {
                    tmpMap.push(gValue);
                    idx = tmpMap.length-1;
                    me.data[idx] = {row: {}, sub : []};
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
                (function(idx) {
                    tr.bind("click", function(e) {
                        me.data[idx].open = me.data[idx].open==1 ? 0 : 1;
                        for (var j in me.data[idx].sub) {
                            if (me.data[idx].open) {
                                me.data[idx].sub[j].dom.show();
                            } else {
                                me.data[idx].sub[j].dom.hide();
                            }
                        }
                        e.stopPropagation();
                    });
                })(i);
            }
        },
        rerender : function(box) {
        },
        sort : function(idx, order) {
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
    };
    return Grouped;
});
