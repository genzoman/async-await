const d3 = require("d3");
const svg = d3.select("svg");
const _ = require("underscore");
require("./animations/drawIn");
// let path = svg.append("path")
//   .attr("d","M20, 20 100, 20 100, 100 20, 100z")
//   .attr("stroke-width",2)
//   .attr("fill","none")
//   .attr("stroke","orange");

let poly = svg.append("polygon")
.attr("points","10, 10 110, 10 110, 110 10, 110")
.attr("fill","none")
.attr("stroke","green")
.attr("stroke-width",2)

var points = poly.attr("points").trim();
var coords = points.split(",");
var nums = coords.map(e=>{
  if(e.indexOf(" ") ===0){
    return e = e.substr(1).split(" ");
  }
  else
    return e;
})
let leftPath = _.flatten(nums).map(e => +e - 10).join(" ");
let path = svg.append("path")
  .attr("d","M"+leftPath+"z")
  .attr("fill","none")
  .attr("stroke","blue")
  .attr("stroke-width",4);


let rightPath = _.flatten(nums).map(e => +e + 10).join(" ");
var path2 = svg.append("path")
.attr("d","M"+rightPath+"z")
.attr("fill","none")
.attr("stroke","orange")
.attr("stroke-width",4);
path2.transition().duration(300).drawIn().ease("linear");
path.transition().duration(300).drawIn();
