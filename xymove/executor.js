// var drift = require("./xymove");
// var Promise = require("bluebird")
// var d3 = require("d3");
//
//   (function(){
//     d3.selection.prototype.size = function(x,y){
//       return d3.select(this).attr({
//         "x":x,
//         "y":y
//       });
//     }
//   })()
//
// function dims(a,b){
//   return this.attr({
//     "x":100,
//     "y":100
//   })
// }
// d3.select("body").append("svg")
//   .append("g")
//   .attr("transform","translate(30,30)")
//   .append("rect")
//   .call(dims.call(this,1,3));
//
//
//
// var promise = new Promise((resolve)=>{
//   var tick = 0;
//   d3.select("g").transition().duration(1000)
//   .h("")
//   .each("end",function(){
//
//   })
// });
var a = function(){
  console.log(this)
  this.thing = function(){
    console.log("thing");
  }

}

var b = function(){
  console.log(this);
  this.anotherThing = function(){
    console.log("another thing");
  }
}
a.call(b);
