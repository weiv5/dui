define(["jquery"], function($) {

function Dom() {
    this.init.apply(this, arguments);
}
Dom.prototype = {
    init : function(tag) {
        var me = this;
        me.dom = $("<"+tag+"></"+tag+">");
        me.length = 0;
    },
    css : function(style) {
        var me = this;
        me.dom.css(style);
        return me;
    },
    attr : function(name, attr) {
        var me = this;
        me.dom.attr(name, attr);
        return me;
    },
    append : function(el) {
        var me = this;
        me.dom.append(el.dom);
        me.length++;
        return me;
    },
    text : function(text) {
        var me = this;
        me.dom.text(text);
        return me;
    },
    render : function(container) {
        var me = this;
        $(container).html(me.dom);
    },
    bind : function(e, deal) {
        var me = this;
        me.dom.bind(e, deal);
    },
};
return Dom;

});
