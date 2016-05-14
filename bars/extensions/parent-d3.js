var d3 = require("d3");
var _ = require("underscore");

(function() {
  'use strict';
  d3.selection.prototype.parent = function(p){
    var self = _.clone(this),
      retVal={};
    if(p){
      var parent = this.node().parentNode
      this.remove();

      d3.select("svg").append("g").id('#'+p).html(self[0][0].innerHTML);
    }
  }
}());
