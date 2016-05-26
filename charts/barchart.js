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
    }
});
