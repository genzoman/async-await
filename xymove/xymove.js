var d3 = require("d3");
var translate = require("../utils/translate");

(function(){
  d3.transition.prototype.drift = function(attrs,x,y){
    if(attrs!=="xy"){
      return this.duration(2000).attr("transform",function(){
          var transform = d3.select(this).attr("transform");
          transform = d3.transform(transform).translate;
          return translate(transform[0] + x, transform[1] + y);
      });
    }
    else{
      return this.duration(2000).attr("transform",function(){
          var currX = d3.select(this).attr("x"),
            currY = d3.select(this).attr("y");

          return translate(currX + x, currY + y);
    });

  }
}
})();



var g  = d3.select("svg").append("g")
  .attr("id","container")
  .attr("transform","translate(20,20)")
  .append("g")
  .attr("id","group");

var text = g.append("text")
  .text("hello world")
  .attr("transform","translate(100,100)")
  .transition()
  .duration(4000)
  .drift(5,20);
