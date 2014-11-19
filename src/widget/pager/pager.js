define([
    "../../core"
], function(Core){
    function Pager() {
        this.init.apply(this, arguments);
    }
    Pager.prototype = {
        init : function(outerId, option) {
            var me = this,
                outer = Core.dom.get(outerId);
            if (outer === null) {
                Core.error(1);
            }
            var box = new Core.dom("div");
            box.addClass(Core.css.pager.box);
            outer.append(box);
            me.pageList = new Core.dom("div");
            box.append(me.pageList);

            me.pageNum = option.pageNum || 1;
            me.showNum = option.showNum || 5;
            me.edgeNum = option.edgeNum || 1;
            if (me.pageNum <= 1) {
                return;
            }
            me.prev = me.createBtn(option.prevText || Core.var.pager.prev, "prev");
            me.next = me.createBtn(option.nextText || Core.var.pager.next, "next");
            me.dot = "...";
            box.prepend(me.prev);
            box.append(me.next);

            var middle = (me.showNum-1)/2;
            if (me.showNum%2==1) {
                me.left = me.right = middle;
            } else {
                me.left = Math.floor(middle);
                me.right = Math.ceil(middle);
            }
            me.current = 1;
            me.last = me.pageNum;

            me.render();
        },
        createBtn : function(text, to) {
            var me = this,
                btn = new Core.dom("a");
            btn.text(text);
            if (typeof to !== "undefined") {
                btn.bind("click", function() {
                    me.selectPage(to);
                });
            }
            return btn;
        },
        render : function() {
            var me = this;
            me.pageList.empty();
            if (me.current > me.left+me.edgeNum+1) {
                for (var i=1; i<=me.edgeNum; i++) {
                    me.pageList.append(me.createBtn(i, i));
                }
                me.pageList.append(me.createBtn(me.dot));
                if (me.current+me.right+me.edgeNum >= me.last) {
                    var n = me.showNum-(me.last-me.current);
                } else {
                    var n = me.left;
                }
                for (var i=n; i>0; i--) {
                    me.pageList.append(me.createBtn(me.current-i, me.current-i));
                }
                var left = me.right;
            } else {
                var n = me.current-1;
                for (var i=1; i<=n; i++) {
                    me.pageList.append(me.createBtn(i, i));
                }
                if (me.current == me.left+me.edgeNum+1) {
                    var left = me.right;
                } else {
                    var left = me.showNum-me.current;
                }
            }
            me.pageList.append(me.createBtn(me.current));
            console.log(me.current);
            if (me.current+me.right+me.edgeNum < me.last) {
                for (var i=1; i<=left; i++) {
                    me.pageList.append(me.createBtn(me.current+i, me.current+i));
                }
                me.pageList.append(me.createBtn(me.dot));
                for (var i=me.edgeNum-1; i>=0; i--) {
                    me.pageList.append(me.createBtn(me.last-i, me.last-i));
                }
            } else {
                var n = me.last-me.current;
                for (var i=1; i<=n; i++) {
                    me.pageList.append(me.createBtn(me.current+i, me.current+i));
                }
            }
            if (me.current == 1) {
                me.prev.addClass(Core.css.pager.disabled);
            } else {
                me.prev.removeClass(Core.css.pager.disabled);
            }
            if (me.current == me.last) {
                me.next.addClass(Core.css.pager.disabled);
            } else {
                me.next.removeClass(Core.css.pager.disabled);
            }
        },
        selectPage : function(to) {
            var me = this;
            switch (to) {
                case "prev":
                    if (me.current > 1) {
                        me.current -= 1;
                    } else {
                        return;
                    }
                    break;
                case "next":
                    if (me.current < me.last) {
                        me.current += 1;
                    } else {
                        return;
                    }
                    break;
                default:
                    me.current = parseInt(to);
                    break;
            }
            me.render();
        },
    };
    Core.extend({
        pager : Pager
    });
    return Core;
});
