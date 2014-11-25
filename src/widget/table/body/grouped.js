define([
    "../../../core",
    "./func"
], function(Core, Func) {
    function Grouped() {
        this.init.apply(this, arguments);
    }
    Grouped.prototype = {
        init : function(option) {
            var me = this;
            me.field = option.field;
            me.group = option.group;
            me.sum = option.sum;
            me.data = [];
            me.sumData = {};

            var tmpMap = [],
                sumData = {};
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
                me.data[idx].sub.push({
                    row : row,
                    dom : Func.createTr(row).addClass(Core.css.table.tr.d2)
                });

                for (var j in option.data[i]) {
                    if (!Core.isNumber(option.data[i][j])) {
                        continue;
                    }
                    if (j !== me.group.fieldIndex) {
                        me.data[idx].row[j] = me.data[idx].row[j] || 0;
                        me.data[idx].row[j] = Core.math.add(me.data[idx].row[j], option.data[i][j]);
                    }
                    if (me.sum.is && Core.isNumber(option.data[i][j])) {
                        sumData[j] = sumData[j] || 0;
                        sumData[j] = Core.math.add(sumData[j], option.data[i][j]);
                    }
                }
            }
            for (var i in me.data) {
                me.data[i].row = Func.formatRow(me.data[i].row, me.field);
                me.data[i].dom = Func.createTr(me.data[i].row).addClass(Core.css.table.tr.d1.init);
                me.bindOpenEvent(me.data[i]);
            }
            if (me.sum.is) {
                sumData[me.field[me.sum.fieldIndex].dataIndex] = option.sum.text;
                me.sumData.row = Func.formatSum(sumData, me.field);
                me.sumData.dom = Func.createTr(me.sumData.row).addClass(Core.css.table.tr.sum);
            }
        },
        render : function(box) {
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
            }
            me.renderSum(box);
        },
        renderSum : function(box) {
            var me = this;
            if (!me.sum.is) {
                return;
            }
            if (me.sum.valign === Core.var.valign.top) {
                box.prepend(me.sumData.dom);
            } else {
                box.append(me.sumData.dom);
            }
        },
        sort : function(idx, order) {
            var me = this;
            Func.sortTr(me.data, idx, order);
            for (var i in me.data) {
                Func.sortTr(me.data[i].sub, idx, order);
            }
        },
        light : function(idx) {
            var me = this;
            for (var j in me.data) {
                me.data[j].dom.children(idx).addClass(Core.css.table.td.highlight);
                for (var k in me.data[j].sub) {
                    me.data[j].sub[k].dom.children(idx).addClass(Core.css.table.td.highlight);
                }
            }
        },
        lightOff : function(idx) {
            var me = this;
            for (var j in me.data) {
                me.data[j].dom.children(idx).removeClass(Core.css.table.td.highlight);
                for (var k in me.data[j].sub) {
                    me.data[j].sub[k].dom.children(idx).removeClass(Core.css.table.td.highlight);
                }
            }
        },
        numSwitch : function(f) {
            var me = this;
            for (var i in me.field) {
                if (!me.field[i].numSwitch) {
                    continue;
                }
                for (var j in me.data) {
                    if (me.data[j].row[i].format == Core.var.defaultVar) {
                        continue;
                    }
                    me.data[j].dom.children(i).text(me.data[j].row[i][f]);
                    for (var k in me.data[j].sub) {
                        if (me.data[j].sub[k].row[i].format == Core.var.defaultVar) {
                            continue;
                        }
                        me.data[j].sub[k].dom.children(i).text(me.data[j].sub[k].row[i][f]);
                    }
                }
                if (me.sum.is && me.sumData.row[i].format !== Core.var.defaultVar) {
                    me.sumData.dom.children(i).text(me.sumData.row[i][f]);
                }
            }
        },
        bindOpenEvent : function(item) {
            var me = this;
            item.dom.bind("click", function(e) {
                if (item.open) {
                    item.open = false;
                    item.dom.removeClass(Core.css.table.tr.d1.open).addClass(Core.css.table.tr.d1.close);
                } else {
                    item.open = true;
                    item.dom.removeClass(Core.css.table.tr.d1.close).addClass(Core.css.table.tr.d1.open);
                }
                for (var j in item.sub) {
                    if (item.open) {
                        item.sub[j].dom.show();
                    } else {
                        item.sub[j].dom.hide();
                    }
                }
            });
        },
    };
    return Grouped;
});
