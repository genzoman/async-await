const d3 = require("d3");
const _ = require("underscore");
const Promise = require("bluebird");
var config = {
  x: 20,
  y: 20,
  width: 20,
  height: 20
}
var rect_ = d3.select("svg").append("rect").attr(config);
window.rect = rect;
let getConfig = (config,newOpts)=> _.extend(config,newOpts);

function rect(opts){
  config = getConfig(config,opts);
  rect.x = (x)=>{
    rect_.attr("x",x);
    return rect;
  }

  rect.y = (y)=>{
    rect_.attr("y",y);
    return rect;
  }
  rect.translate = function(x,y){
    var translate = rect_.attr("transform") || [0,0];
    translate = d3.transform(translate).translate;
    var translateString = `translate(${translate[0] + x},${translate[1] + y})`;
    rect_.attr("transform",translateString);
    return rect;
  }
  rect.animate = (prop,val)=>{
    var start = 0;
    return new Promise((resolve)=>{
      rect_.transition()
        .duration(4000)
        .each('start',function(){
          start++;
        })
        .attrTween(prop,function(){
          var start = d3.select(this).attr(prop);
          return d3.interpolateNumber(start,val);
        })
        .each("end",function(){
          start--;
          if(start===0){
            resolve(rect);
          }
        })
      return rect;
    });
  }
  return rect;
}
rect();
