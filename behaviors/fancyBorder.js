var d3 = require("d3");
var domAttrs = require("../dom/attrs");

(function() {
  'use strict';
  d3.transition.prototype.fancyBorder = function(){

    var attr =  {
      x1: function(){
        let line = domAttrs(this);
        switch(line.id){
          case "top":
            return d3.interpolateNumber(line.x2,line.x1);
          case "bottom":
            return d3.interpolateNumber(line.x2,line.x1);

        }
      },
      y2: function(){
        let line = domAttrs(this);
        switch(line.id){
          case "left":
            return d3.interpolateNumber(line.y1,line.y2);
        case "right":
            return d3.interpolateNumber(line.y1,line.y2);
        }
      }
    }
    for(let prop in attr) this.attrTween(prop,attr[prop]);

    return this;
  }

}());
