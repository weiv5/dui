define(function() {
    var formatFloat = function(f, pos) {
        pos = pos || 0;
        if (pos == 0) {
            return f;
        }
        f = parseFloat(f);
        var score = Math.round(f*Math.pow(10, pos))/Math.pow(10, pos);
        return score.toFixed(pos);
    };
    var numUnit = function(value, pos) {
        pos = pos || 0;
        if(value == 0 || value < 10000) {
            return formatFloat(value, pos);
        }
        unit = typeof unit == 'undefined' ? 1 : 0;
        var u = "";
        if (value < 1000000) {
            value = value/10000;
            u = "万";
        } else if (value < 10000000) {
            value = value/1000000;
            u = "百万";
        } else if (value < 100000000) {
            value = value/10000000;
            u = "千万";
        } else {
            value = value/100000000;
            u = "亿";
        }
        return formatFloat(value, pos) + "<i>"+ u +"</i>";
    };
    var numComma = function (value, pos) {
        pos = pos || 0;
        var num = parseFloat(value);
        if (num == 0) {
            return formatFloat(num, pos);
        }
        var nums = [];
        while (num/1000 || num%1000) {
            var v = num%1000,
                prex = "";
            num = parseInt(num/1000);
            if (num > 0) {
                if (v < 10) {
                    prex = "00";
                } else if (v < 100) {
                    prex = "0";
                }
            }
            if (nums.length == 0) {
                v = formatFloat(v, pos);
            }
            if (prex !== "") {
                v = prex+v;
            }
            nums.unshift(v);
        }
        return nums.join(",");
    };
    return {
        money : function(num) {
            return numComma(num, 2);
        },
        rate : function(num) {
            return formatFloat(num, 2)+"%";
        },
        intUnit : function(num) {
            var pos = num < 10000 ? 0 : 1;
            return numUnit(num, pos);
        },
        intComma : function(num) {
            return numComma(num, 0);
        },
    };
});
