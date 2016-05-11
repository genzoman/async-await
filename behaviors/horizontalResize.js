var d3 = require('d3');
var translate = require("../utils/translate");
var _ = require("underscore");
var getConfig = (config,opts)=> _.extend(config,opts);
var config = {
  translate:''

}
module.exports = horizontalResize;

function horizontalResize(opts){
  var mouse = d3.mouse(this),
    isRightDrag = mouse[0] <config.width/2,
    factor = isRightDrag ? 1 : -1,
    event = d3.event ? d3.event : opts.event;
    var currTransform = d3.transform(d3.select('#xAxis').attr("transform")).translate;


var translate_ = `translate(${currTransform[0] + mouse[0]+ (factor * d3.event.dx)},${currTransform[1]})`;


  let getRightDrag= ()=>{


    return config.width - (factor * d3.event.dx);
  }
  let getLeftDrag = ()=>{
    config.translate = null;
    return mouse[0] - (factor * d3.event.dx);
  }
  let getWidth = ()=>{
     if(isRightDrag){
       return getRightDrag();
     }
     return getLeftDrag();
  }

  horizontalResize.width = ()=> isRightDrag ? getRightDrag() : getLeftDrag();
  var translate = function(){
    var x = currTransform[0] + mouse[0]+ (factor * d3.event.dx),
      y = currTransform[1];
    return isRightDrag  ? translate(x,y) : null;

  }

  return {
    width: getWidth(),
    translate: translate_
  }
}
