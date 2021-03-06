define([
    "../../../core"
],function(Core) {
    return {
        sortTr : function(trs, idx, order) {
            trs.sort(function(a, b) {
                if (a.row[idx].num == b.row[idx].num) {
                    return 0;
                }
                return a.row[idx].num > b.row[idx].num ? order : -order;
            });
        },
        createTr : function(row) {
            var tr = new Core.dom("tr");
            for (var j in row) {
                var td = new Core.dom("td");
                if (row[j].dataClass) {
                    td.addClass(row[j].dataClass);
                }
                if (row[j].align) {
                    if (typeof Core.css.table.td.align[row[j].align] !== "undefined") {
                        td.addClass(Core.css.table.td.align[row[j].align]);
                    }
                } else if (Core.isNumber(row[j].num)) {
                    td.addClass(Core.css.table.td.align.right);
                }
                td.html(row[j].format);
                tr.append(td);
            }
            return tr;
        },
        formatRow : function(data, field) {
            var row = [];
            for (var i in field) {
                var num = Core.var.defaultVar;
                if (typeof field[i].formula === "function") {
                    num = field[i].formula(data, false);
                } else if (typeof data[field[i].dataIndex] !== "undefined") {
                    num = data[field[i].dataIndex];
                }
                if (Core.isNumber(num)) {
                    num = parseFloat(num);
                }
                if (Core.isNaN(num)) {
                    num = Core.var.defaultVar;
                }
                var format = num;
                if (num!==Core.var.defaultVar && typeof field[i].format === "function") {
                    format = field[i].format(num);
                }
                if (num === Core.var.defaultVar) {
                    num = 0;
                }
                row.push({format: format, num: num, dataClass: field[i].dataClass, align: field[i].align});
            }
            return row;
        },
        formatSum : function(data, field) {
            var row = [];
            for (var i in field) {
                var num = Core.var.defaultVar;
                if (field[i].isSum) {
                    if (typeof field[i].formula === "function") {
                        num = field[i].formula(data, true);
                    } else if (typeof data[field[i].dataIndex] !== "undefined") {
                        num = data[field[i].dataIndex];
                    }
                    if (Core.isNaN(num)) {
                        num = Core.var.defaultVar;
                    }
                    var format = num;
                    if (num!==Core.var.defaultVar && typeof field[i].format === "function") {
                        format = field[i].format(num);
                    }
                } else {
                    var format = num;
                }
                row.push({format: format, num: num, dataClass: field[i].dataClass, align: field[i].align});
            }
            return row;
        },
    }
});
