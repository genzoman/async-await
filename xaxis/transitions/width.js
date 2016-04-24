var d3 = require("d3");
let getPathWidth = (width)=>{
  return `M0,6V0H${width}V6`
}

(function(){
  d3.transition.prototype.width = width_;
})();

function width_(width){
  
  this.transition().duration(400).attrTween("d",function(){
    return d3.interpolateString(getPathWidth(1),getPathWidth(width));
  })
}
