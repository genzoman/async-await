const d3 = require("d3");
const domAttrs = require("../dom/attrs");
const svg = d3.select("svg");

function gridlines(elem,numLines){
  let elemAttrs = domAttrs(elem),
    horzSpace = elemAttrs.width/numLines,
    vertSpace = elemAttrs.height/numLines;


//
let horizontalGridline = (attrs,n)=>{

  return {
    x1: attrs.x,
    x2: attrs.x+attrs.width,
    "stroke-width": 4,
    "fill": "none",
    "stroke": "blue",
    y1: attrs.y + n * vertSpace,
    y2: attrs.y + n * vertSpace
  }
}
//

var horzGridlineCoords = d3.range(0,numLines,1)
  .map((e,i)=>{
    return horizontalGridline(elemAttrs,i);
  });
var lines = svg.selectAll("line")
    .data(horzGridlineCoords)
    .enter()
    .append("line")
    .attr({
      x1:(d,i)=> d.x1,
      x2:(d,i)=> d.x2,
      y1:(d,i)=> d.y1,
      y2:(d,i)=> d.y2,
      "stroke-width":4,
      "fill":"none",
      "stroke":"blue"
    })
  return gridlines;
}

svg.append("rect").attr({
  x:30,
  y:30,
  width: 50,
  height:50
});

gridlines(d3.select("rect").node(),4);
