const d3 = require("d3");
const circlePath = require("../paths/circle-path");
const svg = d3.select("svg");
let config = {
  cy: 40,
  cx: 40,
  r: 25
}
let circle = svg.append("circle").attr(config);
svg.append("path")
  .attr("d",circlePath(40,40,29))
  .attr("stroke-width",4)
  .attr("stroke","blue")
  .attr("fill","none");
