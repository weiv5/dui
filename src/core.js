define([
    "./format",
    "./error",
    "./dom",
    "./data/css",
    "./data/var",
    "./ajax",
    "./math"
], function(Format, Err, Dom, Css, Var, Ajax, Math) {
    var Core = function() {};
    Core.extend = Core.prototype.extend = function(obj) {
        for (var i in obj) {
            this[i] = obj[i];
        }
    };
    Core.extend({
        isArray: Array.isArray,
        inArray: function(el, arr) {
            if (!Core.isArray(arr)) {
                return false;
            }
            return arr.indexOf(el)>=0 ? true : false;
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
            return !Core.isString(obj)&&!Core.isObject(obj)&&!Core.isArray(obj)&&isNaN(obj);
        },
        format : Format,
        error : Err,
        dom : Dom,
        css : Css,
        var : Var,
        ajax : Ajax,
        math : Math,
    });
    return Core;
});
