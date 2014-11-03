define([
    "../../core",
    "./func"
], function(Core, Func) {
    function Lineal() {
        this.init.apply(this, arguments);
    }
    Lineal.prototype = {
        init : function(option) {
            var me = this;
            me.field = option.field;
            me.isSum = option.isSum;
            me.data = [];
            me.sum = {};
            me.sumPosition = option.sumPosition;
            
            var sum = {};
            for (var i in option.data) {
                me.data.push({row : Func.formatRow(option.data[i], me.field)});
                for (var j in option.data[i]) {
                    if (me.isSum && Core.isNumber(option.data[i][j])) {
                        sum[j] = sum[j] || 0;
                        sum[j] += option.data[i][j];
                    }
                }
            }
            if (me.isSum) {
                me.sum.row = Func.formatSum(sum, me.field);
            }
        },
        render : function(box) {
            var me = this;
            for (var i in me.data) {
                var tr = Func.createTr(me.data[i].row);
                me.data[i].dom = tr;
                box.append(tr);
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
            Func.sortTr(this.data, idx, order);
        },
        numSwitch : function(f) {
            var me = this;
            for (var i in me.field) {
                if (!me.field[i].numSwitch) {
                    continue;
                }
                for (var j in me.data) {
                    me.data[j].dom.children(i).text(me.data[j].row[i][f]);
                }
            }
        },
    };
    return Lineal;
});
