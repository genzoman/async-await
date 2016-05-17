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

let getCoordsTop = (elem)=>{
  let elemAttrs = domAttrs(elem.node ? elem.node() :elem);

  return {
      x1: elemAttrs.x -3 ,
      y1: elemAttrs.y,
      x2: rectConfig.width + rectConfig.x+3,
      y2: elemAttrs.y,
      id: "top"
  }
}
let getCoordsRight = elem=>{
  let elemAttrs = domAttrs(elem.node ? elem.node() :elem);
  return {
    x1: rectConfig.width + rectConfig.x+3,
    x2: rectConfig.width + rectConfig.x+3,
    y1: elemAttrs.y,
    y2: elemAttrs.y+rectConfig.height,
    id: "right"
  }
}

let getCoordsBottom = elem =>{
  let elemAttrs = domAttrs(elem.node ? elem.node() :elem);
  return {
    x1: rectConfig.x+3,
    x2: rectConfig.width + rectConfig.x+3,
    y1: elemAttrs.y+rectConfig.height,
    y2: elemAttrs.y+rectConfig.height,
    id: "bottom"
  }
}
let getCoordsLeft = elem =>{
  let elemAttrs = domAttrs(elem.node ? elem.node() :elem);
  return {
    x1: rectConfig.x+3,
    x2: rectConfig.x +3,
    y1: elemAttrs.y,
    y2: elemAttrs.y+rectConfig.height,
    id: "left"
  }
}


var rect = d3.select("g").append("rect").attr(rectConfig);

module.exports = surround;

function surround(elem){
  elem = elem.node ? elem.node() : elem
  var coords = getCoordsTop(elem);
  let line = d3.select("g")
    .append("line")
    .attr(coords)
    .style("stroke","red")
    .style("stroke-width",4);

  let right = getCoordsRight(elem);
  let rightLine = d3.select("g")
    .append("line")
    .attr(right)
    .style("stroke","red")
    .style("stroke-width",4);

  let bottom = getCoordsBottom(elem);

  let bottomLine = d3.select("g")
    .append("line")
    .attr(bottom)
    .style("stroke","red")
    .style("stroke-width",4);

  let left = getCoordsLeft(elem);
  let leftLine = d3.select("g")
    .append("line")
    .attr(left)
    .style("stroke","red")
    .style("stroke-width",4);
}
surround(d3.select("rect"));
