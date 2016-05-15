var d3 = require("d3");
(function() {
  'use strict';
  d3.selection.prototype.set = function(prop,elem){
    elem = elem.node ? d3.select(elem).node() : elem;
    var val = d3.select(elem).attr(prop);
    return this.attr(prop,val);
  }
}());
