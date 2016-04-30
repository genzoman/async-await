var d3 = require("d3");
var ee = require("event-emitter");
var emitter = require("../ChartEvents");
var checkbox = require("./checkbox");


require("../xaxis/transitions/hide");

checkbox();



var button = d3.select("body")
  .append("div")
  .text("CLICK 121ME")
  .on("click",function(){
    emitter.emit("onFontChange",{
      font:{
        'font-size': '15pt',
        'fill': 'green'
      }
  });
});
/*


*/
