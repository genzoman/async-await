var d3 = require("d3");
module.exports = function(path){
  var totalLength = path.node().getTotalLength();
  path
    .attr("stroke-dasharray", totalLength+ " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .duration(600)
      .ease("bounce")
      .attr("stroke-dashoffset", 0);

}
