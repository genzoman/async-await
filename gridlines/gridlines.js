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
//this is the data we need to bind to the horizontal gridlines
//there is an ugly issue of binding the data, but then have to
//use the paradigm .attr({x1: d=>d.x1}) kind of thing
//i wish the bound data could do that for us
var horzGridlineCoords = d3.range(0,numLines,1)
  .map((e,i)=>{
    return horizontalGridline(elemAttrs,i);
  });
//VERTICAL
let verticalGridLine = (attrs,n)=>{
  return {
    x1: attrs.x  + n * horzSpace,
    x2: attrs.x  + n * horzSpace,
    "stroke-width": 4,
    "fill": "none",
    "stroke": "blue",
    y1: attrs.y,
    y2: attrs.y + attrs.height
  }
}

var vertGridlineCoords = d3.range(0,numLines,1)
  .map((e,i)=>{
    return verticalGridLine(elemAttrs,i);
  });

  svg.selectAll("line")
    .data(vertGridlineCoords)
    .enter()
    .append("line")
    .attr({
      x1:d=>d.x1,
      x2:d=>d.x2,
      y1:d=>d.y1,
      y2:d=>d.y2,
      "stroke-width":d=>d['stroke-width'],
      "fill":"none",
      "stroke":d=>d['stroke']
    });
  return gridlines;
}

svg.append("rect").attr({
  x:30,
  y:30,
  width: 50,
  height:50
});

gridlines(d3.select("rect").node(),4);
