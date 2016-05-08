var d3 = require ("d3");
window.d3 = d3;
let getRectAttrs = (elem)=>{
  var translate = d3.transform(d3.select(elem).attr("transform")).translate || [0,0]
  return {
    x: +d3.select(elem).attr("x"),
    y: +d3.select(elem).attr("y"),
    width: +d3.select(elem).attr("width"),
    height: +d3.select(elem).attr("height"),
    translateX: translate[0],
    translateY: translate[1]
  }
}

let getCircleAttrs  = (elem)=>{
  var translate = d3.transform(d3.select(elem).attr("transform")).translate || [0,0]
  return {
    x: +d3.select(elem).attr("cx"),
    y: +d3.select(elem).attr("cy"),
    cx: +d3.select(elem).attr("cx"),
    cy: +d3.select(elem).attr("cy"),
    width: +d3.select(elem).attr("width"),
    height: +d3.select(elem).attr("height"),
    translateX: translate[0],
    translateY: translate[1]
  }
}

let getGroupAttrs = (elem)=>{
  var box = elem.getBoundingClientRect();
  var translate = d3.transform(d3.select(elem).attr("transform")).translate || [0,0]
  return {
    width: +box.width.toFixed(2),
    height: box.height,
    x: translate[0],
    y: translate[1]

  }
}

let getAttrs = (elem)=>{
  switch(elem.tagName.toLowerCase()){
    case 'rect':
      return getRectAttrs(elem);
      break;
    case 'circle':
      return getCircleAttrs(elem);
      break;
    case 'g':
      return getGroupAttrs(elem);
  }
}
module.exports = getAttrs;
