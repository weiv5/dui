define(["./lib/jquery"], function($) {
    function Dom() {
        this.init.apply(this, arguments);
    }
    Dom.get = function(domId) {
        var obj = $(domId);
        return obj.length == 0 ? null : new Dom(obj);
    },
    Dom.prototype = {
        init : function(tag) {
            if (typeof tag === "string") {
                this.dom = $("<"+tag+"></"+tag+">");
            } else {
                this.dom = tag;
            }
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
        text : function(text) {
            this.dom.text(text);
            return this;
        },
        append : function(el) {
            this.dom.append(el.dom);
            return this;
        },
        bind : function(e, deal) {
            this.dom.bind(e, deal);
            return this;

        },
        replace : function(target, src) {
            var me = this;
            var obj = me.dom.find(target);
            if (obj.length > 0) {
                obj.html(src);
            } else {
                me.append(src);
            }
        },
    };
    return Dom;
});
