define(function() {
    return {
        table : {
            box : "x-tbl",
            toolbar : "x-tbl-toolbar",
            content : "x-tbl-content",
            footer : "x-tbl-footer",
            td : {
                align : {
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
            }
        },
        pager : {
            box : "x-widget-pager",
            disabled : "disabled",
        },
        sort : {
            init : "order",
            "-1" : "order-down",
            "1" : "order-up",
        },
    };
});
