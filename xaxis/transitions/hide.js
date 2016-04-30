var d3 = require("d3");
window.d3 = d3;
(function(){
  d3.transition.prototype.hide = hide_;
})()
var config_;
function hide_(config){
  config_ = config;
  this.transition().duration(600).attrTween("d",hide);

}
let shrinkFromLeftToRight = (sign)=>{
  start = "M" + config_.range[0] + ","
    + sign * config_.outerTickSize + "V0H" + config_.range[1] + "V" + sign * config_.outerTickSize;
  end = "M" + config_.range[1] + ","
    + sign * config_.outerTickSize + "V0H" + config_.range[1] + "V" + sign * config_.outerTickSize;
  return d3.interpolateString(start,end);
}
let shrinkFromRightToLeft = (sign)=>{
  start = "M" + config_.range[0] + ","
    + sign * config_.outerTickSize + "V0H" + config_.range[1] + "V" + sign * config_.outerTickSize;
  end = "M" + 0 + ","
    + sign * config_.outerTickSize + "V0H" + config_.range[0] + "V" + sign * config_.outerTickSize;
  return d3.interpolateString(start,end);
}
let hide = ()=>{
  let sign = config_.orient === "top" || config_.orient === "left" ? -1 : 1,
      range = config_.range, //<-range is array
      outerTickSize = config_.outerTickSize || 6,
      start='',
      end='';
  if(config_.orient ==="bottom" || config_.orient==="top"){
    //return shrinkFromLeftToRight();
    return shrinkFromRightToLeft(sign);
  }

  return d3.interpolateString(start,end);
}
