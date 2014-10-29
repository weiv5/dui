define([
], function() {
    var Layout = function() {
        this.init.apply(this, arguments);
    }
    Layout.prototype = {
        init : function(container, title) {
            var me = this;
            me.title = title || "";
            me.container = container;
        },
    };
    return layout;
});
