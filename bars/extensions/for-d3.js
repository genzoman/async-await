var d3 = require("d3");
(function() {
  'use strict';
  d3.selection.prototype.for = function(tag,data){
    return this.append("g")
      .selectAll(tag)
      .data(data)
      .enter()
        .append(tag)

  }
}());
