define([
    "../../core"
],function(Core) {
    return {
        createTr : function(row) {
            var tr = new Core.dom("tr");
            for (var j in row) {
                var td = new Core.dom("td");
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
                var format = num;
                if (typeof field[i].format === "function") {
                    format = field[i].format(num);
                }
                row.push({format: format, num: num});
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
                    var format = num;
                    if (typeof field[i].format === "function") {
                        format = field[i].format(num);
                    }
                } else {
                    var format = num;
                }
                row.push({format: format, num: num});
            }
            return row;
        },
    }
});
