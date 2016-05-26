var bars = require("../bars/bars");
module.exports = chart;
function chart(){
    bars();    
}
bars({
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
            [2,5],
            [.5,2.5]
        ]
    }
});
