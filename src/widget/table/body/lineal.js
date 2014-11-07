define([
    "../../../core",
    "../func"
], function(Core, Func) {
    function Lineal() {
        this.init.apply(this, arguments);
    }
    Lineal.prototype = {
        init : function(option) {
            var me = this;
            me.field = option.field;
            me.sum = option.sum;
            me.data = [];
            me.sumData = {row:{}};
            me.sumData.row[option.field[0].dataIndex] = option.sum.text;
            
            var sumData = {};
            for (var i in option.data) {
                me.data.push({row : Func.formatRow(option.data[i], me.field)});
                for (var j in option.data[i]) {
                    if (me.sum.is && Core.isNumber(option.data[i][j])) {
                        sumData[j] = sumData[j] || 0;
                        sumData[j] += option.data[i][j];
                    }
                }
            }
            for (var i in me.data) {
                var tr = Func.createTr(me.data[i].row);
                me.data[i].dom = tr;
            }
            if (me.sum.is) {
                sumData[me.field[me.sum.fieldIndex].dataIndex] = option.sum.text;
                me.sumData.row = Func.formatSum(sumData, me.field);
                me.sumData.dom = Func.createTr(me.sumData.row);
            }
        },
        render : function(box) {
            var me = this;
            for (var i in me.data) {
                box.append(me.data[i].dom);
            }
            me.renderSum(box);
        },
        renderSum : function(box) {
            var me = this;
            if (!me.sum.is) {
                return;
            }
            if (me.sum.valign === "top") {
                box.prepend(me.sumData.dom);
            } else {
                box.append(me.sumData.dom);
            }
        },
        sort : function(idx, order) {
            Func.sortTr(this.data, idx, order);
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
                }
                if (me.sum.is && me.sumData.row[i].format !== Core.var.defaultVar) {
                    me.sumData.dom.children(i).text(me.sumData.row[i][f]);
                }
            }
        },
    };
    return Lineal;
});
