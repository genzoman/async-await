var d3 = require("d3");
var centerPos = require("../../positions/center");
(function() {
  'use strict';
  d3.selection.prototype.center = function(el,type){
    var coords = centerPos.call(this,el,type);
    var pos = {};
    switch (this.node().tagName.toLowerCase()) {
      case "rect":
        pos = {
          x: coords[0],
          y: coords[1]
        }
        break;
      case "circle":
        pos = {
          cx: coords[0],
          cy: coords[1]
        }
        break;

      default:

    }
    return this.attr(pos);
  };
}());
