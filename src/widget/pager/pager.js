define([
    "../../core"
], function(Core){
    function Pager() {
        this.init.apply(this, arguments);
    }
    Pager.prototype = {
        init : function(outerId, option) {
            var me = this;

            me.pageNum = option.pageNum || 1;
            if (me.pageNum <= 1) {
                return;
            }
            var outer = Core.dom.get(outerId);
            if (outer === null) {
                Core.error(1);
            }
            var box = new Core.dom("div");
            box.addClass(Core.css.pager.box);
            outer.append(box);
            me.pageList = new Core.dom("div");
            box.append(me.pageList);
            me.rendered = false;

            me.showNum = option.showNum || 5;
            me.edgeNum = option.edgeNum || 1;
            me.onSelect = option.onSelect || false;
            me.last = me.pageNum-1;
            me.current = option.current || 0;
            if (me.current > me.last) {
                me.current = 0;
            }
            var middle = (me.showNum-1)/2;
            if (me.showNum%2==1) {
                me.left = me.right = middle;
            } else {
                me.left = Math.floor(middle);
                me.right = Math.ceil(middle);
            }
            me.dot = "...";

            me.prev = me.createBtn(option.prevText || Core.var.pager.prev, "prev");
            box.prepend(me.prev);
            me.next = me.createBtn(option.nextText || Core.var.pager.next, "next");
            box.append(me.next);

            me.render();
        },
        createBtn : function(text, to) {
            var me = this,
                btn = new Core.dom("a");
            btn.text(text);
            if (to !== "undefined" && to !== false) {
                btn.bind("click", function() {
                    me.selectPage(to);
                });
            }
            return btn;
        },
        render : function() {
            var me = this;
            if (me.pageNum <= me.showNum+me.edgeNum && me.rendered) {
                return;
            }
            me.pageList.empty();

            var leftIdx = Math.max(0, me.current-me.left),
                rightIdx = Math.min(leftIdx+me.showNum-1, me.last);
            if (rightIdx==me.last) {
                leftIdx = rightIdx-me.showNum+1;
            }
            var edge = Math.min(me.edgeNum, leftIdx);
            for (var i=0; i<edge; i++) {
                me.pageList.append(me.createBtn(i+1, i));
            }
            if (leftIdx > me.edgeNum) {
                me.pageList.append(me.createBtn(me.dot));
            }
            for (var i=leftIdx; i<=rightIdx; i++) {
                var to = (i == me.current) ? false : i;
                me.pageList.append(me.createBtn(i+1, to));
            }
            if (rightIdx < me.last-me.edgeNum) {
                me.pageList.append(me.createBtn(me.dot));
            }
            var edge = Math.min(me.edgeNum, me.last-rightIdx);
            for (var i=edge-1; i>=0; i--) {
                me.pageList.append(me.createBtn(me.last-i+1, me.last-i));
            }
            me.rendered = true;
        },
        selectPage : function(to) {
            var me = this;
            switch (to) {
                case "prev":
                    if (me.current > 0) {
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
            if (typeof me.onSelect === "function") {
                me.onSelect(me.current);
            }
        },
    };
    Core.extend({
        pager : Pager
    });
    return Core;
});
