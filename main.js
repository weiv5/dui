require.config({
    baseUrl: "src/",
    paths: {
        "dui" : "./dui",
        "jquery" : "./lib/jquery"
    },
});
require(["dui"], function(Dui) {
    var option = {
        sum : {
            valign : "top", // top bottom
            fieldIndex : 0,
            text : "合计"
        },
        dataGroup : {
            dataIndex : "brand",
        },
        field : [
            {
                text : "名称",
                dataIndex : "name",
            },{
                text : "金额",
                fieldGroup: "销售",
                dataIndex : "amount",
                isSum : false,
                sortable : true,
                format : function(num) {
                    return "$"+num;
                },
                numSwitch : true,
                isSum : true
            },{
                text : "数量",
                fieldGroup: "销售",
                dataIndex : "count",
                isSum : true
            },{
                text : "金额/数量",
                fieldGroup: "销售",
                formula : function(data) {
                    return data.amount/data.count;
                },
                isSum : true
            }
        ],
        data : [
            {
                name : "mi1",
                brand: "手机",
                amount : 1000,
                count : 200,
            },{
                name : "mi2",
                brand: "手机",
                amount : 5000,
                count : 600,
            },{
                name : "tv1",
                brand: "电视",
                amount : 7000,
                count : 800,
            },{
                name : "tv2",
                brand: "电视",
                amount : 500,
                count : 50,
            },
        ]
    };
    var table = new Dui.table("#tbl", option);
    table.render();
});
