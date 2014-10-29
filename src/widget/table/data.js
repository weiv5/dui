define(function() {

    function Data() {
        this.init.apply(this, arguments);
    }
    Data.prototype = {
        init : function(table, data) {
            var me = this;
            me.table = table;
            me.data = [];
            me.dataGroup = null;
            me.sum = null;
            for (var i in data) {
                var row = [];
                me.table.field.each(function(k, v) {
                    if (v.sum && typeof data[i][v.dataIndex] !== "undefined") {
                        me.sum = me.sum || {};
                        me.sum[v.dataIndex] = me.sum[v.dataIndex] || 0;
                        me.sum[v.dataIndex] += data[i][v.dataIndex];
                    }
                    if (me.table.dataGroup !== false && typeof data[i][v.dataIndex] !== "undefined") {
                        me.dataGroup = me.dataGroup || {};
                        var d = me.table.dataGroup.dataIndex;
                        var f = me.table.dataGroup.fieldIndex
                        me.dataGroup[data[i][d]] = me.dataGroup[data[i][d]] || {children:[]};
                        if (f == k) {
                            if (typeof me.dataGroup[data[i][d]][v.dataIndex] === "undefined") {
                                me.dataGroup[data[i][d]][v.dataIndex] = data[i][d];
                                me.dataGroup[data[i][d]].children.push(i);
                            }
                        } else {
                            me.dataGroup[data[i][d]][v.dataIndex] = me.dataGroup[data[i][d]][v.dataIndex] || 0;
                            me.dataGroup[data[i][d]][v.dataIndex] += data[i][v.dataIndex];
                        }
                    }

                    var cell = {num:"-", format:"-"};
                    if (typeof v.formula === "function") {
                        cell.num = v.formula(data[i]);
                    } else if (typeof data[i][v.dataIndex] !== "undefined"){
                        cell.num = data[i][v.dataIndex];
                    }
                    cell.format = cell.num;
                    if (typeof v.format === "function") {
                        cell.format = v.format(cell.num);
                    }
                    row.push(cell);
                });
                me.data.push(row);
            }
            if (me.sum) {
                me.sum = me.formatRow(me.sum);
            }
            if (me.dataGroup) {
                var dataGroup = [];
                for (var i in me.dataGroup) {
                    dataGroup.push(me.formatRow(me.dataGroup[i]));
                }
            }
        },
        formatRow : function(row) {
            var me = this;
            var data = [];
            me.table.field.each(function(k, v) {
                var cell = {num:"-", format:"-"};
                if (typeof v.formula === "function") {
                    cell.num = v.formula(row);
                } else if (typeof row[v.dataIndex] !== "undefined"){
                    cell.num = row[v.dataIndex];
                }
                cell.format = cell.num;
                if (typeof v.format === "function") {
                    cell.format = v.format(cell.num);
                }
                data.push(cell);
            });
            return data;
        },
    };
    return Data;

});
