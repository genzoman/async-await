'use strict';
var d3 = require ("d3");


let getRectAttrs = (elem)=>{
  if(!global || window){
    elem = d3.select(elem) || elem;
  }

  var translate = elem.node ? d3.transform(elem.attr("transform")).translate
                    : [0,0];
  return {
    x: +elem.attr("x"),
    y: +elem.attr("y"),
    width: +elem.attr("width"),
    height: +elem.attr("height"),
    translateX: translate[0],
    translateY: translate[1],
    absolutePosition:function(){
      var x = this.x + this.translateX,
        y = this.y + this.translateY
      return [x,y];
    }
  }
}
let getCenter = (elem,middle)=>{
  type = type || "topLeft";
  var coords =[];
  var pos = getAttrs(elem);
  var fns = {
    middle(){
      x = pos.absolutePosition()[0] + (pos.width/2),
      y = pos.absolutePosition()[1] + (pos.height/2);
      return [x,y];
    },
    topLeft(){
      return [pos.x,pos.y];
    },
    topMiddle(){
      return [pos.x + pos.width];
    }
  }
  return fns[type]();
}

let getCircleAttrs  = (elem)=>{

  elem = elem.node ? elem.node() : elem;
  var translate = d3.transform(d3.select(elem).attr("transform")).translate || [0,0];
  var attrs = {
    x: +d3.select(elem).attr("cx"),
    y: +d3.select(elem).attr("cy"),
    cx: +d3.select(elem).attr("cx"),
    cy: +d3.select(elem).attr("cy"),
    width: +d3.select(elem).attr("r"),
    r: +d3.select(elem).attr("r"),
    height: +d3.select(elem).attr("r"),
    translateX: translate[0],
    translateY: translate[1],
    absolutePosition:function(){
      var x = this.x + this.translateX,
        y = this.y + this.translateY
      return [x,y];
    },
    fill:"blue"
  }
  return attrs;
}

let getGroupAttrs = (elem)=>{
  var box = elem.getBoundingClientRect();
  var translate = d3.transform(d3.select(elem).attr("transform")).translate || [0,0]
  return {
    width: +box.width.toFixed(2),
    height: box.height,
    translateX: translate[0],
    translateY: translate[1],
    absolutePosition:function(){
      return[box.width+ this.translateX,box.height + this.translateY];
    }

  }
}

let getAttrs = (elem)=>{
  elem = elem.node ? elem.node() : elem;
  switch(elem.tagName.toLowerCase()){
    case 'rect':
      return getRectAttrs(elem);
      break;
    case 'circle':
      return getCircleAttrs(elem);
      break;
    case 'g':
      return getGroupAttrs(elem);
    case 'line':
      return getLineAttrs(elem);
  }
}
let getLineAttrs = elem=>{
  return {
      x1: +d3.select(elem).attr("x1"),
      x2: +d3.select(elem).attr("x2"),
      y1: +d3.select(elem).attr("y1"),
      y2: +d3.select(elem).attr("y2"),
      strokeWidth: +d3.select(elem).attr("stroke-width"),
      stroke: d3.select(elem).attr("stroke"),
      fill: d3.select(elem).attr("fill"),
      id: d3.select(elem).attr("id")
  }
}
module.exports = function(elem){
  return getAttrs(elem);
};
