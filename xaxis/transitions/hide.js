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

let hide = ()=>{
  let sign = config_.orient === "top" || config_.orient === "left" ? -1 : 1,
      range = config_.range, //<-range is array
      outerTickSize = config_.outerTickSize || 6,
      start='',
      end='';
  if(config_.orient ==="bottom" || config_.orient==="top"){
    start = "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize;
    end = "M" + range[1] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize
  }
  else{
    start ="M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize
  }
  return d3.interpolateString(start,end);
}
