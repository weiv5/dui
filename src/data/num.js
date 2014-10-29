define(["./core"], function(dui) {
    dui.extend({
        isArray : Array.isArray,
        inArray: function(v, arr) {
            return arr == null ? -1 : arr.indexOf(v);
        },
        isNumber : function (obj) {
            return !dui.isArray(obj) && (obj-parseFloat(obj)+1)>=0;
        },
        trim: function(text) {
            return text==null ? "" : (text+"").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        },

    });
});
