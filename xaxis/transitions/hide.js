var d3 = require("d3");
const getPathString = require("../../paths/getPathString");
window.d3 = d3;
(function(){
  d3.transition.prototype.hide = hide_;
})()
var config_;
function hide_(config){
  config_ = config;
  this.transition().duration(400).attrTween("d",hide);

}
//begin horizontal axis shrinking
let horizontalAxisShrink = ()=>{
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
  let shrinkBottomToTop = (sign)=>{
    start = "M" + config_.range[0] + ","
      + sign * config_.outerTickSize + "V0H" + config_.range[1] + "V" + sign * config_.outerTickSize;
    end = "M" + 0 + ","
      + sign * 0 + "V0H" + config_.range[0] + "V" + sign * 0;
    return d3.interpolateString(start,end);
  }

  let shrinkTopToBottom = (sign)=>{
    start = "M" + config_.range[0] + ","
      + sign * 0 + "V0H" + config_.range[1] + "V" + sign * 10;

    end = "M" + config_.range[0] + ","
      + sign * config_.outerTickSize + "V0H" + config_.range[1] + "V" + sign * config_.outerTickSize;

    return d3.interpolateString(start,end);
  }
  return {
    leftToRight: shrinkFromLeftToRight,
    rightToLeft: shrinkFromRightToLeft,
    bottomToTop: shrinkBottomToTop,
    topToBottom: shrinkTopToBottom
  }
}

//end horizontal axis shrinking

//begin vertical axis shrinking
let verticalAxisShrink = ()=>{
  let vertical = (dir)=>{

    var start = getPathString('left',config_);
    var end = getPathString('left',{
      height: .001,
      width: 6,
      orient: 'left',
      isX:false,
      range: config_.range
    });
    return dir==="bottomUp" ?  d3.interpolateString(start,end): d3.interpolateString(end,start);

  }
  return {
    vertical: vertical
  }
}



//end vertical axis shrinking

let hide = ()=>{
  let sign = config_.orient === "top" || config_.orient === "left" ? -1 : 1,
      range = config_.range, //<-range is array
      outerTickSize = config_.outerTickSize || 6,
      start='',
      end='';

  if(config_.orient ==="bottom" || config_.orient==="top"){
    //return shrinkFromLeftToRight();
    //return shrinkBottomToTop(sign);
    return horizontalAxisShrink().leftToRight(sign);
  }
  else{
    return verticalAxisShrink().vertical('bottomUp')
  }


}
