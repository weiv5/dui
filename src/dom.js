define(["./lib/jquery"], function($) {
    function Dom() {
        this.init.apply(this, arguments);
    }
    Dom.prototype = {
        init : function(tag) {
            this.dom = $("<"+tag+"></"+tag+">");
            return this;
        },
        addClass : function(cls) {
            this.dom.addClass(cls);
            return this;
        },
        removeClass : function(cls) {
            this.dom.removeClass(cls);
            return this;
        },
        css : function(style) {
            this.dom.css(style);
            return this;
        },
        attr : function(name, attr) {
            this.dom.attr(name, attr);
            return this;
        },
        append : function(el) {
            this.dom.append(el.dom);
            return this;
        },
        text : function(text) {
            this.dom.text(text);
            return this;
        },
        bind : function(e, deal) {
            this.dom.bind(e, deal);
            return this;

        },
    };
    return Dom;
});
