var d3 = require("d3");
var _ = require("underscore");
let getConfig = (opts)=> _.extend(config_,opts);
var rect = d3.select("rect");


setTimeout(function(){
  d3.select("rect").transition().duration(400).attrTween("width",function(){
    var w = +d3.select(this).attr("width");
    return d3.interpolateNumber(w--,0);
  });

},2000);
