define(function() {
    var dui = function() {};
    dui.extend = dui.prototype.extend = function(obj) {
        for (var i in obj) {
            this[i] = obj[i];
        }
    };
    return dui;
});
