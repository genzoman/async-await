var d3 = require("d3");

function circlePath(cx, cy, r){
    return 'M '+cx+' '+cy+' m -'+r+', 0 a '+r+','+r+' 0 1,0 '+(r*2)+',0 a '+r+','+r+' 0 1,0 -'+(r*2)+',0';
}

var svg = d3.select("svg");
let path = svg.append("path")
  .attr("d",circlePath(100,100,50))
  .attr("stroke-width",3)
  .style("stroke","blue")
  .attr("fill","none");
