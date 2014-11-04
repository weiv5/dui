define([
    "./format",
    "./error",
    "./dom",
    "./data/css",
    "./data/var",
], function(Format, Err, Dom, Css, Var) {
    var Core = function() {};
    Core.extend = Core.prototype.extend = function(obj) {
        for (var i in obj) {
            this[i] = obj[i];
        }
    };
    Core.extend({
        dom : Dom,
        css : Css,
        var : Var,
        error : Err,
        format : Format,
        isArray: Array.isArray,
        inArray: function(el, arr) {
            if (!Core.isArray(arr)) {
                return false;
            }
            return arr.indexOf(el)>=0 ? true : false;
        },
        isEmpty : function(obj) {
            if (obj == null) return true;
            if (isArray(obj) || isString(obj) || _.isArguments(obj)) return obj.length === 0;
            for (var key in obj) if (_.has(obj, key)) return false;
            return true;
        },
        isNumber : function(obj) {
            return !Core.isArray(obj) && (obj-parseFloat(obj)+1)>=0;
        },
        isString : function(obj) {
            return toString.call(obj) === '[object String]';
        },
        isObject : function(obj) {
            return toString.call(obj) === '[object Object]';
        },
        isNaN : function(obj) {
            return Core.isNumber(obj) && obj !== +obj;
        }
    });
    return Core;
});
