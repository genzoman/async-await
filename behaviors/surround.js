const d3 = require("d3");
const svg = d3.select("svg");
const domAttrs = require("../dom/attrs");
const axis = require("../axis/axis");
var g = svg.append("g")

window.d3 = d3;

var rectConfig = {
  height:125,
  width:50,
  y: 10,
  x: 10
}
d3.select("svg").append("rect").attr({
  height: 40,
  width:50,
  y: 60,
  x: 80
})

d3.select("svg").append("rect").attr(rectConfig);
let getSurroundLineData = (el,w) =>{
  let elemAttrs = domAttrs(el.node ? el.node() :el);
  return [
    {
      x1: elemAttrs.x-w/2 ,
      y1: elemAttrs.y,
      x2: elemAttrs.x + elemAttrs.width + (w/2),
      y2: elemAttrs.y,
      id: "top"
    },
    {
      x1: elemAttrs.width + elemAttrs.x,
      x2: elemAttrs.width + elemAttrs.x,
      y1: elemAttrs.y,
      y2: elemAttrs.y+elemAttrs.height + w/2,
      id: "right"
    },
    {
      x1: elemAttrs.x,
      x2: elemAttrs.width + elemAttrs.x,
      y1: elemAttrs.y+elemAttrs.height,
      y2: elemAttrs.y+elemAttrs.height,
      id: "bottom"
    },
    {
      x1: elemAttrs.x,
      x2: elemAttrs.x,
      y1: elemAttrs.y,
      y2: elemAttrs.y+elemAttrs.height + w/2,
      id: "left"
    }
  ]
}


module.exports = surround;

function surround(elem){
  elem.each(function(d,i){

    var elem = getSurroundLineData(this,4);
    d3.select("g").selectAll(".lines")
      .data(getSurroundLineData(this,4))
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
          id: d=>d.id,
          stroke: "orange",
          "stroke-width": 4
        });
  });

}
d3.selectAll("rect").call(surround);
