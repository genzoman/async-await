//barchart.js
'use strict';
var bars = require("../bars/bars");
var d3 = require("d3");
function chart(opts){
    chart.bars = bars(opts);
    return chart;
}
var config = {
    height: 500,
    width: 500,
    id: 'bars',
    xAxis:{
        data: ['a','b','c'],
        id: 'xAxis',
        parent: 'svg',
        orient: 'bottom',
        hasDrag:true,
        group: d3.select('#xAxis')
    },
    yAxis:{
        id: 'yAxis',
        parent: 'svg',
        orient: 'left',
        data:[
            [1,3],
            [2,3],
            [.5,2.5]
        ],
        group: d3.select('#yAxis')
    }
}
chart(config);
module.exports = chart;
