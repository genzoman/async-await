const d3 = require("d3");
const _ = require("underscore");
const Promise = require("bluebird");
var config = {
  cx: 20,
  cy: 20,
  r: 20
}
var circle_ = d3.select("svg").append("circle").attr(config);

let getConfig = (config,newOpts)=> _.extend(config,newOpts);

window.circle =circle;
function circle(opts){
  config = getConfig(config,opts);
  circle.radius = (r)=>{
    circle_.attr("r",r);
    return circle;
  }
  circle.x = (x)=>{
    circle_.attr("cx",x);
    return circle;
  }
  circle.cx = circle.x;
  circle.y = (y)=>{
    circle_.attr("cy",y);
    return circle;
  }
  circle.cy = circle.y;
  circle.move = function(x,y){
    var translate = circle_.attr("transform") || [0,0];
    circle_.attr("transform",function(){
      var xVal = translate[0] + x;
      var yVal = translate[1] + y;
      return `translate(${xVal},${yVal})`;

    });
    return circle;
  }
  circle.fadeColor = (color)=>{
    var start = circle_.attr("fill") || "black";

    var t = 0;
    return new Promise((resolve)=>{
      circle_.transition().duration(1000)
      .each("start",()=>t++)
      .attrTween("fill",function(){
        return d3.interpolateHsl(start,color);
      })
      .each("end",function(){
        t--;
        if(t===0){
          resolve(circle);
        }
      })
    })
  }
  circle.fadeColor('blue').then(x=>{
    x.color("green").animate('r',100);
  })
  circle.color = (color)=>{
    circle_.attr("fill",color);
    return circle;
  }
  circle.animate = (prop,val)=>{
    var start = 0;
    return new Promise((resolve)=>{
      circle_.transition()
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
            resolve(circle);
          }
        })
      return circle;
    });

  }
  return circle;
}
module.exports = circle;
