define(["jquery"], function($) {
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
        html : function(el) {
            if (el instanceof Dom) {
                this.dom.html(el.dom);
            } else {
                this.dom.html(el);
            }
            return this;
        },
        append : function(el) {
            if (el instanceof Dom) {
                this.dom.append(el.dom);
            } else if (typeof el === "string") {
                this.dom.append(el);
            }
            return this;
        },
        prepend : function(el) {
            if (el instanceof Dom) {
                this.dom.prepend(el.dom);
            } else if (typeof el === "string") {
                this.dom.prepend(el);
            }
            return this;
        },
        after : function(el) {
            this.dom.after(el.dom);
            return this;
        },
        empty : function() {
            this.dom.empty();
            return this;
        },
        bind : function(e, deal) {
            this.dom.bind(e, deal);
            return this;
        },
        children : function(idx) {
            return Dom.get(this.dom.children().eq(idx));
        },
        hide : function() {
            this.dom.hide();
            return this;
        },
        show : function() {
            this.dom.show();
            return this;
        },
        top : function() {
            return this.dom.offset().top;
        },
        right : function() {
            return this.dom.offset().right;
        },
        width : function() {
            return this.dom.width();
        },
        height : function() {
            return this.dom.height();
        },
    };
    return Dom;
});
