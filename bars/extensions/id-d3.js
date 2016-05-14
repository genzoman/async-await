var d3 = require("d3");
(function() {
  'use strict';
  d3.selection.prototype.id = function(_){
    return _ ? this.attr("id",_) : this.attr("id");
  }
}());
