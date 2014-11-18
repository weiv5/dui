define([
    "../../core"
],function(Core) {
    function Footer() {
        this.init.apply(this, arguments);
    }
    Footer.prototype = {
        init : function(table, option) {
            var me = this;
            me.box = new Core.dom("div");
            me.box.addClass(Core.css.table.footer);
        },
        render : function(box) {
            box.append(this.box);
        }
    }
    return Footer;
});
