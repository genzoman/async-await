var d3 = require("d3");
var _ = require("underscore");
let getConfig = (opts)=> _.extend(config_,opts);
var rect = d3.select("rect");


setTimeout(function(){
  hide('topDown');
},4000);
function hide(dir){
  if(dir==="bottomUp"){
    return d3.select("rect").transition().duration(400).attrTween("height",function(){
      var w = +d3.select(this).attr("height");
      return d3.interpolateNumber(w--,0);
    });
  }
  if(dir==="topDown"){
    return d3.select("rect").transition().duration(400).attrTween("height",function(){
      var w = +d3.select(this).attr("height");
      return d3.interpolateNumber(w--,0);
    }).attrTween("y",function(){
      var y = +d3.select(this).attr("y");
      var w = +d3.select(this).attr("width")
      return d3.interpolateNumber(y,w/2);
    });
  }


}
