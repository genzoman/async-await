var d3 = require("d3");
window.d3 = d3;
var svg = d3.select("svg");

(function() {
  'use strict';
  d3.selection.prototype.center = function(el,dir){

    var newPos = centerOn[dir](el);
    this.attr({
      cx: newPos[0],
      cy: newPos[1]
    });
  }

}());

var rect = svg.append("rect").attr({
  height:50,
  width:50,
  x:50,
  y:50
});
var circle = svg.append("g").append("circle").attr({
  r: 20,
  cx:25,
  cy:25
})
.style("fill","green");

var getDomAttrs = require('../dom/attrs');

let centerOn = {
  topLeft(el){
    var pos = getDomAttrs(el);
    return [pos.x,pos.y]
  },
  center(el){
    var pos = getDomAttrs(el);
    var x = pos.absolutePosition()[0] + (pos.width/2),
      y = pos.absolutePosition()[1] + (pos.height/2);
      return [x,y];
  },
  topMiddle(el){
    var pos = getDomAttrs(el);
    var x = pos.absolutePosition()[0] + (pos.width/2),
      y = pos.absolutePosition()[1];
      return [x,y];
  },
  topRight(el){
    var pos = getDomAttrs(el);
    var x = pos.absolutePosition()[0] + pos.width,
      y = pos.absolutePosition()[1];
      return [x,y];
  },
  bottomRight(el){
    var pos = getDomAttrs(el);
    var x = pos.absolutePosition()[0] + pos.width,
      y = pos.absolutePosition()[1] + pos.height;
      return [x,y];
  }

}
circle.center(d3.select("g"),'center');
module.exports = function(el,type){
  return centerOn[type](el);
}
