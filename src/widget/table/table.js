define([
], function() {
    function Table() {
        this.init.apply(this, arguments);
    }
    Table.prototype = {
        init : function(container, option) {
            var me = this;
            me.layout = new Layout({container: container, title: option.title});
            me.header = new Header(me, option.field);
            me.body = new Body(me, option);
        },
        append : function(dom) {
            var me = this;
            me.layout.append(dom);
        },
    };
    return Table;
});
