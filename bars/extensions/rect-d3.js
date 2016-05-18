var d3 = require("d3");
(function() {
  'use strict';
  d3.selection.prototype.rect = function(attr){
    return this.append("rect").attr(attr);
  };
}());
var svg = d3.select("svg");

svg.rect({
  x: 10,
  y:10,
  width:100,
  height:100
});
