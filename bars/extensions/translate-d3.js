'use strict';
var d3 = require('d3');
(function() {
  'use strict';
  d3.selection.prototype.translate = function(x,y){
    return this.attr("transform",`translate(${x},${y})`);
  }
}());
