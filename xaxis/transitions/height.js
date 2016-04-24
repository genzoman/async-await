var d3 = require("d3");
let getPathHeight = (h)=>{
  return `M0,${h}V0H500V${h}`
}
(function(){
  d3.transition.prototype.height = height_;
})();

function height_(h){
  this.transition().duration(400).attrTween("d",function(){
    return d3.interpolateString(getPathHeight(1),getPathHeight(h));
  })
}
