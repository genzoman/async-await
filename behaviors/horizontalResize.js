var d3 = require('d3');
var translate = require("../utils/translate");
module.exports = horizontalResize;
function horizontalResize(config){
  var mouse = d3.mouse(this),
    isRightDrag = mouse[0] <config.width/2
    factor = isRightDrag ? 1 : -1;

  let getRightDrag= ()=>{
    var currTransform = d3.transform(d3.select('#xAxis').attr("transform")).translate
    d3.select('#xAxis').attr("transform",function(){
        return translate(currTransform[0] + mouse[0]+ (factor * d3.event.dx),currTransform[1]);
    });
    return config.width - (factor * d3.event.dx);
  }
  let getLeftDrag = ()=>{

    return mouse[0] - (factor * d3.event.dx);
  }
  let getWidth = ()=>{
     if(isRightDrag){
       return getRightDrag();
     }
     return getLeftDrag();
  }
  return getWidth();
}
