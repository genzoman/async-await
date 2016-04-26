const d3 = require("d3");
var emitter = require("../ChartEvents");
let binding = {
  enable:true
}


function checkbox(){
  return d3.select("body")
    .append("input")
    .attr("type","checkbox")
    .attr("checked",binding.enable)
    .on("change",function(){
      binding.enable = !binding.enable;
      emitter.emit("onAxisHide",binding);
    });
}
module.exports = checkbox;
