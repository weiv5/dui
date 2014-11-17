define([
    "../../core"
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
                td.text(row[j].format);
                tr.append(td);
            }
            return tr;
        },
        formatRow : function(data, field) {
            var row = [];
            for (var i in field) {
                var num = Core.var.defaultVar;
                if (typeof field[i].formula === "function") {
                    num = field[i].formula(data);
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
                if (num === Core.var.defaultVar) {
                    num = 0;
                }
                row.push({format: format, num: num, dataClass: field[i].dataClass});
            }
            return row;
        },
        formatSum : function(data, field) {
            var row = [];
            for (var i in field) {
                var num = Core.var.defaultVar;
                if (field[i].isSum) {
                    if (typeof field[i].formula === "function") {
                        num = field[i].formula(data);
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
                row.push({format: format, num: num, dataClass: field[i].dataClass});
            }
            return row;
        },
    }
});
