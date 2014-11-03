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
            me.sum = [];
            
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
        },
        render : function(box) {
            var me = this;
            for (var i in me.data) {
                var tr = new Core.dom("tr");
                for (var j in me.data[i].row) {
                    var td = new Core.dom("td");
                    td.text(me.data[i].row[j].format);
                    tr.append(td);
                }
                me.data[i].dom = tr;
                box.append(tr);
            }
        },
        rerender : function(box) {
            var me = this;
            for (var i in me.data) {
                box.append(me.data[i].dom);
            }
        },
        sort : function(idx, order) {
            this.data.sort(function(a, b) {
                return a.row[idx].num > b.row[idx].num ? order : -order;
            });
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
