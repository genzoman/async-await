var d3 = require("d3");
var attrs = {
  cx: 20,
  cy: 20,
  r: 20
}
var circle = d3.select("svg").append("circle").attr(attrs);

circle.transition().duration(1000).attrTween("r",function(){
  var r = +d3.select(this).attr("r");
  return d3.interpolateNumber(r,0);
});
