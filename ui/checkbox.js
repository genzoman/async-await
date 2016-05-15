const d3 = require("d3");
var emitter = require("../ChartEvents");
var axis = require("../xaxis/axis");

axis({
  parent: 'svg'
}).drag();

let binding ={
    hasDrag: axis.config().hasDrag
}


function checkbox(){
  return d3.select("body")
    .append("input")
    .attr("type","checkbox")
    .attr("checked",binding.hasDrag)
    .on("change",function(){
      binding.hasDrag = !binding.hasDrag;
      //emitter.emit("onAxisHide",binding);
      axis(binding);
    });
}
checkbox();
module.exports = checkbox;
