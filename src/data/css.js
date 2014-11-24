define(function() {
    return {
        table : {
            box : "x-tbl",
            toolbar : "x-tbl-tools",
            content : "x-tbl-content",
            footer : "x-tbl-footer",
            td : {
                align : {
                    left : "td-align-left",
                    center : "td-align-center",
                    right : "td-align-right",
                },
                highlight : "td-highlight",
            },
            th : {
                align : {
                    center : "th-align-center",
                    left : "th-align-left",
                }
            },
            tr : {
                d1 : {
                    init : "tr-d1",
                    open : "tr-d1-open",
                    close : "tr-d1-close",
                },
                d2 : "tr-d2",
                sum : "tr-sum"
            },
            realwidth : "x-tbl-realwidth",
            bigfont : {
                icon : "tools-icon-font",
                biger : "x-tbl-bigfont"
            },
            numswitch : {
                icon : "tools-icon-number-switch"
            }
        },
        pager : {
            box : "x-widget-pager",
            disabled : "disabled",
            current : "current",
            dots : "dots",
        },
        sort : {
            init : "order",
            "-1" : "order-down",
            "1" : "order-up",
        },
    };
});
