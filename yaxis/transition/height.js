var d3 = require("d3");
let getPathHeight = (h,ctx)=>{
  var height = ctx.attr("d");
  var i = height.lastIndexOf('V');

  return `M0,06V0H${h}V0`
}

(function(){
  d3.transition.prototype.hide = hide_;
})();

function height(h){
  this.transition().duration(400).attrTween("d",function(){
    return d3.interpolateString(getPathHeight(h),getPathHeight(.001));
  })
}
window.height = height;
