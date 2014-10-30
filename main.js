require.config({
    baseUrl: "src/",
    paths: {
        "jquery": "./lib/jquery",
        "table" : "./widget/table",
        "format" : "./format",
        "dom" : "./dom"
    },
});
require(["table/table"], function(Table) {
    var option = { 
        dataGroup : {
            dataIndex : "brand",
            fieldIndex : 0
        },
        field : [
            {
                text : "名称",
                dataIndex : "name",
            },{
                text : "金额",
                fieldGroup: "销售",
                dataIndex : "amount",
                isSum: true
            },{
                text : "数量",
                fieldGroup: "销售",
                dataIndex : "count",
                sortable : true
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
        ]};
    var table = new Table("#tbl", option);
    table.render();
});
