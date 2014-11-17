require.config({
    baseUrl: "./src/",
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
                format : function(num) {
                    return "$"+num;
                },
                numSwitch : true,
                isSum : true,
                dataClass : "dataClass1",
                fieldClass : ""
            },{
                text : "数量",
                fieldGroup: "销售",
                dataIndex : "count",
                sortable : true,
                isSum : true
            },{
                text : "金额/数量",
                fieldGroup: "销售",
                formula : function(data) {
                    return data.amount/data.count;
                },
                sortable : true,
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
            },{
                name : "tv3",
                brand: "电视",
                count : 40,
            },{
                name : "tv4",
                brand: "电视",
                count : 30,
            }
        ]
    };
    var table = new Dui.table("#tbl", option);
    table.render();

    option.dataGroup = {dataIndex:"brand"};
    var table2 = new Dui.table("#tbl2", option);
    table2.render();
});
