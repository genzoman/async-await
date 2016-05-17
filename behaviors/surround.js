const d3 = require("d3");
const svg = d3.select("svg");
const domAttrs = require("../dom/attrs");
const axis = require("../axis/axis");
var g = svg.append("g")

window.d3 = d3;

var rectConfig = {
  height:50,
  width:50,
  y: 10,
  x: 10
}



let getSurroundLineData = (el,w) =>{
  let elemAttrs = domAttrs(el.node ? el.node() :el);
  return [
    {
      x1: elemAttrs.x-w/2 ,
      y1: elemAttrs.y,
      x2: rectConfig.width + rectConfig.x + w/2,
      y2: elemAttrs.y,
      id: "top"
    },
    {
      x1: rectConfig.width + rectConfig.x,
      x2: rectConfig.width + rectConfig.x,
      y1: elemAttrs.y,
      y2: elemAttrs.y+rectConfig.height + w/2,
      id: "right"
    },
    {
      x1: rectConfig.x,
      x2: rectConfig.width + rectConfig.x,
      y1: elemAttrs.y+rectConfig.height,
      y2: elemAttrs.y+rectConfig.height,
      id: "bottom"
    },
    {
      x1: rectConfig.x,
      x2: rectConfig.x,
      y1: elemAttrs.y,
      y2: elemAttrs.y+rectConfig.height + w/2,
      id: "left"
    }
  ]
}
var rect = d3.select("g").append("rect").attr(rectConfig);

module.exports = surround;

function surround(elem){
  elem = elem.node ? elem.node() : elem
  var lines = d3.select("g").selectAll(".lines")
    .data(getSurroundLineData(elem,4))
    .enter()
      .append("line")
      .attr({
        x1:function(d,i){
          return d.x1;
        },
        x2:function(d,i){
          return d.x2;
        },
        y1:function(d,i){
          return d.y1;
        },
        y2:function(d,i){
          return d.y2;
        },
        stroke: "orange",
        "stroke-width": 4
      })


}
surround(d3.select("rect"));
