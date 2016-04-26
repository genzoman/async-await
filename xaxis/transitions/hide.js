var d3 = require("d3");
window.d3 = d3;
let shrinkX = ()=>{
  var h = d3.select("path").node().getBoundingClientRect().height;
  var w = d3.select("path").node().getBoundingClientRect().width;
  var begin = d3.select("path").attr("d");
  var end =  `M0,${h}V0H${0}V${h}`;
  return d3.interpolateString(begin,end)

}

let shrinkY = ()=>{

  var w = d3.select("path").node().getBoundingClientRect().width;
  var h = d3.select("path").node().getBoundingClientRect().height;
  var end =  `M0,${0}V0H${w}V${0}`;
  var begin = d3.select("path").attr("d");
  return d3.interpolateString(begin,end);
}



(function(){
  d3.transition.prototype.hide = hide_;
})();

function hide_(h){
  this.transition().duration(600).attrTween("d",shrinkY)
}
