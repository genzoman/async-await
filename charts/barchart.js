//barchart.js
'use strict';
var bars = require("../bars/bars");

function chart(opts){
    chart.bars = bars(opts);
    return chart;
}
var config = {
    height: 500,
    width: 500,
    xAxis:{
        data: ['a','b','c'],
        id: 'xAxis',
        parent: 'svg',
        orient: 'bottom',
        hasDrag:true
    },
    yAxis:{
        id: 'yAxis',
        parent: 'svg',
        orient: 'left',
        data:[
            [1,3],
            [2,3],
            [.5,2.5]
        ]
    }
}
chart(config);
module.exports = chart;
