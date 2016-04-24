var d3 = require("d3");
let getPathWidth = (h)=>{
  return `M0,6V0H${h}V6`
}

(function(){
  d3.transition.prototype.hide = hide_;
})();

function hide_(h){
  this.transition().duration(600).attrTween("d",function(){
    return d3.interpolateString(getPathWidth(h),getPathWidth(.001));
  })
}
