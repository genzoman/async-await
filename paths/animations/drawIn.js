//drawIn.js
var d3 = require("d3");
var circlePath = require("../../paths/circle-path");
(function() {
  'use strict';
  d3.transition.prototype.drawIn = function(){
    let elem = this.node();
    var totalLength = elem.getTotalLength();
    return d3.select(elem)
        .attr("stroke-dasharray",()=>{
          console.log(this)
          return totalLength+ " " + totalLength;
        })
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(450)
          .ease("cubic")
          .attr("stroke-dashoffset", 0);
  }
}());
