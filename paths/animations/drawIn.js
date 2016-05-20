//drawIn.js
var d3 = require("d3");
var circlePath = require("../../paths/circle-path");
(function() {
  'use strict';
  d3.transition.prototype.drawIn = function(){
    let elem = this.node();
    var totalLength = elem.getTotalLength();
    return d3.select(elem)
        .attr("stroke-dasharray", totalLength+ " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(600)
          .ease("bounce")
          .attr("stroke-dashoffset", 0);
  }
}());
