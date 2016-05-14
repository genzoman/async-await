var d3 = require("d3");



var getDomAttrs = require('../dom/attrs');

/*module.exports = */function center(el,type){
var pos = getDomAttrs(this),
  parentPos = getDomAttrs(el);
  var attrs = {
    topLeft(el){
      var parentAbsPos = parentPos.absolutePosition();
      return [parentAbsPos[0]+ pos.x,parentAbsPos[1]+pos.y];
    },
    center(el){
      var xMiddle = (parentPos.width - pos.width)/2,
        yMiddle = (parentPos.height - pos.height)/2;


        newX = parentPos.absolutePosition()[0] + xMiddle,
        newY = parentPos.absolutePosition()[1] + yMiddle;


        return [newX,newY];

    },
    topMiddle(el){

      var x = pos.absolutePosition()[0] + (parentPos.width-pos.width)/2,
        y = pos.absolutePosition()[1];
        return [x,y];
    },
    topRight(el){

      var x = pos.absolutePosition()[0] + pos.width + Math.abs(pos.x - parentPos.x),
        y = pos.absolutePosition()[1] +  Math.abs(pos.y - parentPos.y);
        return [x,y];
    },
    bottomRight(el){

      var x = pos.absolutePosition()[0] + pos.width + Math.abs(pos.x - parentPos.x),
        y = pos.absolutePosition()[1]
          + (parentPos.height-pos.height) + Math.abs(pos.y - parentPos.y)
        return [x,y];
    },
    bottomLeft(el){
      var x = Math.abs(pos.x - parentPos.x),
        y = pos.absolutePosition()[1]
          + (parentPos.height-pos.height) + Math.abs(pos.y - parentPos.y)
        return [x,y];
    }
  }
  return attrs[type](el);
}
var svg = d3.select("svg");
bigRect = svg.append("rect").attr({
  x: 10,
  y: 10,
  height:100,
  width:100,
  fill:'green'
});
smallRect = svg.append("rect").attr({
  x:0,
  y:0,
  height: 50,
  width: 50,
  fill: 'blue'
});
var coords = center.call(smallRect.node(),bigRect.node(),'bottomLeft');
console.log(coords);
