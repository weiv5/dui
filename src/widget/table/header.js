define([
    "../../core",
    "../../dom/dom",
], function(Dui, Dom, Css) {
    function Header() {
        this.init.apply(this, arguments);
    }
    Header.prototype = {
        init : function(context, conf) {
            var me = this;
            me.context = context;
            me.field = [];
            me.fieldGroupMap = [];
            me.fieldGroupCnt = [];

            for (var i in conf) {
                var groupId = -1;
                var idx = 0;
                if (conf[i].fieldGroup) {
                    var last = Math.max(me.fieldGroupMap.length-1, 0);
                    if (me.fieldGroupMap[last] == conf[i].fieldGroup) {
                        me.fieldGroupCnt[last]++;
                        groupId = last;
                    } else {
                        me.fieldGroupMap.push(conf[i].fieldGroup);
                        me.fieldGroupCnt.push(1);
                        groupId = last+1;
                    }
                }
                me.field.push({
                    idx : idx,
                    text : conf[i].text || "",
                    sortable : conf[i].sortable || false,
                    order : Dui.var.sort.asc,
                    width : conf[i].width || 100,
                    groupId : groupId,
                    numSwitch : conf[i].numSwitch || false,
                });
                idx++;
            }
            me.isFieldGroup = me.fieldGroupMap.length > 0;
        },
        render : function() {
            var me = this;
            var colgroup = new Dom("colgroup");
            var thead = new Dom("thead");
            var tr1 = new Dom("tr");
            var tr2 = new Dom("tr");
            var fieldGroupAppend = [];
            for (var i in me.field) {
                var col = new Dom("col");
                col.attr(width: me.field[i].width);
                colgroup.append(col);

                var th2 = new Dom("th");
                th2.text(me.field[i].text);
                if (me.isFieldGroup) {
                    if (me.field[i].groupId > 0) {
                        tr2.append(th2);
                        var gid = me.field[i].groupId;
                        if (!Dui.inArray(fieldGroupAppend, gid)) {
                            fieldGroupAppend.push(gid);
                            var th1 = new Dom("th");
                            th1.attr("colspan", me.fieldGroupCnt[gid]).text(me.fieldGroupMap[gid]);
                            tr1.append(th1);
                        }
                    } else {
                        th2.attr("rowspan", 2);
                        tr1.append(th2);
                    }
                } else {
                    tr2.append(th2);
                }
                me.field[i].dom = th2;
                me.bindEvent(i);
            }
            if (me.isFieldGroup) {
                thead.append(t1);
            }
            thead.append(t2);
            me.context.append({colgroup:colgroup, thead: thead});
        },
        bindEvent : function(idx) {
            var me = this;
            var obj = me.field[idx];
            if (obj.sortable) {
                obj.dom.bind("click", function() {
                    var oCls = Dui.css.table.th.sort[obj.ord];
                    obj.ord = obj.ord == Dui.var.sort.asc ? Dui.var.sort.desc : Dui.var.sort.asc;
                    var nCls = Dui.css.table.th.sort[obj.ord];
                    obj.dom.removeClass(oCls).addClass(nCls);
                    me.context.sort(idx, obj.ord);
                });
            }
        },
    };
});
