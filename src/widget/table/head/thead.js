define([
    "../../../core"
], function(Core) {
    function Thead() {
        this.init.apply(this, arguments);
    }
    Thead.prototype = {
        init : function(table, option) {
            var me = this;
            me.table = table;
            me.field = [];
            me.fieldGroupMap = [];
            me.fieldGroupCnt = [];
            me.sortField = -1;

            var conf = option.field,
                idx = 0;
            for (var i in conf) {
                var groupId = -1;
                if (typeof conf[i].fieldGroup !== "undefined") {
                    var last = Math.max(me.fieldGroupMap.length-1, 0);
                    if (idx>0 && me.field[idx-1].groupId==last && me.fieldGroupMap[last]==conf[i].fieldGroup) {
                        me.fieldGroupCnt[last]++;
                        groupId = last;
                    } else {
                        me.fieldGroupMap.push(conf[i].fieldGroup);
                        me.fieldGroupCnt.push(1);
                        groupId = me.fieldGroupMap.length-1;
                    }
                }
                me.field.push({
                    idx : idx,
                    text : conf[i].text || "",
                    sortable : conf[i].sortable || false,
                    ord : Core.var.sort.asc,
                    width : conf[i].width || 100,
                    groupId : groupId,
                    fieldClass : conf[i].fieldClass || false
                });
                idx++;
            }
            me.isFieldGroup = me.fieldGroupMap.length > 0;
        },
        render : function(box) {
            var me = this;
            var colgroup = new Core.dom("colgroup");
            var thead = new Core.dom("thead");
            var tr1 = new Core.dom("tr");
            var tr2 = new Core.dom("tr");
            var fieldGroupAppend = [];
            for (var i in me.field) {
                var col = new Core.dom("col");
                col.attr("width", me.field[i].width);
                colgroup.append(col);

                var th2 = new Core.dom("th");
                th2.html(me.field[i].text);
                if (me.isFieldGroup) {
                    if (me.field[i].groupId >= 0) {
                        tr2.append(th2);
                        var gid = me.field[i].groupId;
                        if (!Core.inArray(gid, fieldGroupAppend)) {
                            fieldGroupAppend.push(gid);
                            var th1 = new Core.dom("th");
                            th1.attr("colspan", me.fieldGroupCnt[gid]).addClass(Core.css.table.th.align.center).html(me.fieldGroupMap[gid]);
                            tr1.append(th1);
                        }
                    } else {
                        th2.attr("rowspan", 2);
                        tr1.append(th2);
                    }
                } else {
                    tr2.append(th2);
                }
                if (me.field[i].fieldClass) {
                    th2.addClass(me.field[i].fieldClass);
                }
                me.field[i].dom = th2;
                me.bindEvent(i);
            }
            if (me.isFieldGroup) {
                thead.append(tr1);
            }
            thead.append(tr2);

            var container = me.table.createTblDom();
            container.box.append(colgroup);
            container.box.append(thead);
            box.append(container.xtbl);
        },
        bindEvent : function(idx) {
            var me = this;
            var obj = me.field[idx];
            if (obj.sortable) {
                obj.dom.addClass(Core.css.sort.init);
                obj.dom.bind("click", function() {
                    if (me.sortField > 0 && idx!==me.sortField) {
                        var last = me.field[me.sortField];
                        last.dom.removeClass(Core.css.sort[last.ord]);
                        last.ord = Core.var.sort.asc;
                        me.table.body.lightOff(last.idx);
                    }
                    var oCls = Core.css.sort[obj.ord];
                    obj.ord = obj.ord == Core.var.sort.asc ? Core.var.sort.desc : Core.var.sort.asc;
                    var nCls = Core.css.sort[obj.ord];
                    obj.dom.removeClass(oCls).addClass(nCls);
                    me.table.body.sort(idx, obj.ord);
                    me.sortField = idx;
                    me.table.body.light(idx);
                });
            }
        },
    };
    return Thead;
});
