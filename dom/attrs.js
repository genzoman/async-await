var d3 = require ("d3");

let getRectAttrs = (elem)=>{

  return {
    x: +d3.select(elem).attr("x"),
    y: +d3.select(elem).attr("y"),
    width: +d3.select(elem).attr("width"),
    height: +d3.select(elem).attr("height")
  }
}
let getCircleAttrs  = (elem)=>{
  return {
    x: +d3.select(elem).attr("cx"),
    y: +d3.select(elem).attr("cy"),
    cx: +d3.select(elem).attr("cx"),
    cy: +d3.select(elem).attr("cy"),
    width: +d3.select(elem).attr("width"),
    height: +d3.select(elem).attr("height")
  }
}
let getGroupAttrs = (elem)=>{
  var box = elem.getBoundingClientRect();
  return {
    width: box.width,
    height: box.height

  }
}
let getAttrs = (elem)=>{
  switch(elem.tagName.toLowerCase()){
    case 'rect':
      return getRectAttrs(elem);
      break;
    case 'circle':
      return getCircleAttrs(elem);
  }
}
module.exports = getAttrs;
