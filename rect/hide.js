var d3 = require("d3");
var _ = require("underscore");
let getConfig = (opts)=> _.extend(config_,opts);
var rect = d3.select("rect");
rect.insert("rect").attr({
  x:100,
  y:100,
  fill: "blue"
});


function hide(orient,dir){
  if(orient==="vertical"){
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
  else{
    //
    if(dir==="rightLeft"){
      return d3.select("rect").transition().duration(400).attrTween("width",function(){
        var w = +d3.select(this).attr("width");
        return d3.interpolateNumber(w--,0);
      });
    }
    if(dir==="leftRight"){
      return d3.select("rect").transition().duration(400).attrTween("width",function(){
        var w = +d3.select(this).attr("width");
        return d3.interpolateNumber(w--,0);
      }).attrTween("x",function(){
        var x = +d3.select(this).attr("x");
        var w = +d3.select(this).attr("width")
        return d3.interpolateNumber(x,w/2);
      });
    }
  }




}
