var d3 = require("d3");



var getDomAttrs = require('../dom/attrs');

module.exports = function(el,type){
var pos = getDomAttrs(this),
  parentPos = getDomAttrs(el);
  var attrs = {
    topLeft(el){

      return [parentPos.x+pos.width,parentPos.y];
    },
    center(el){
      var xMiddle = (parentPos.width - pos.width)/2,
        yMiddle = (parentPos.height - pos.height)/2,
        newX = parentPos.absolutePosition()[0] + xMiddle,
        newY = parentPos.absolutePosition()[1] + yMiddle;
        return [newX,newY];
    },
    topMiddle(el){
      var x = pos.absolutePosition()[0] + (pos.width/2),
        y = pos.absolutePosition()[1];
        return [x,y];
    },
    topRight(el){

      var x = pos.absolutePosition()[0] + pos.width,
        y = pos.absolutePosition()[1];
        return [x,y];
    },
    bottomRight(el){

      var x = pos.absolutePosition()[0] + pos.width,
        y = pos.absolutePosition()[1] + pos.height;
        return [x,y];
    }
  }
  return attrs[type](el);
}
// let centerOn = {
//
//
// }
// circle.center(rect,'center');
// module.exports = function(el,type){
//   return centerOn[type](el);
// }
