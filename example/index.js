require.config({
    baseUrl: "../src/",
    paths: {
        "dui" : "./dui",
        "jquery" : "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
    },
});
require(["dui"], function(Dui) {
    var option = {
        sum : {
            valign : "top", // top bottom
            //fieldIndex : 0,
            //text : "sum"
        },
        /*
        dataGroup : {
            fieldIndex : 0,
            dataIndex : "brand",
        },
        */
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
                format : Dui.format.money,
                numSwitch : true,
                isSum : true,
            },{
                text : "订单数",
                fieldGroup: "销售",
                dataIndex : "count",
                format : Dui.format.intComma,
                sortable : true,
                isSum : true
            },{
                text : "人数",
                fieldGroup: "销售",
                dataIndex : "count",
                format : Dui.format.intUnit,
                sortable : true,
                isSum : true
            },{
                text : "金额/数量",
                fieldGroup: "销售",
                formula : function(data) {
                    return data.amount/data.count;
                },
                format : Dui.format.rate,
                sortable : true,
                isSum : true
            }
        ],
        data : [
            {
                name : "mi1",
                brand: "手机",
                amount : 100100.91,
                count : 20190,
            },{
                name : "mi2",
                brand: "手机",
                amount : 500120,
                count : 60230,
            },{
                name : "tv1",
                brand: "电视",
                amount : 700980,
                count : 809080,
            },{
                name : "tv2",
                brand: "电视",
                amount : 50180,
                count : 52330,
            },{
                name : "tv3",
                brand: "电视",
                count : 411450,
            },{
                name : "tv4",
                brand: "电视",
                count : 789330,
            }
        ]
    };
    var table = new Dui.table("#tbl", option);

    option.dataGroup = {dataIndex:"brand"};
    option.sum.valign = "bottom";
    var table2 = new Dui.table("#tbl2", option);

    var pager = new Dui.pager("#pager", {
        pageNum : 10,
        showNum : 5,
        edgeNum : 1,
        onSelect : function(page) {
            console.log(page);
        },
    });
});
