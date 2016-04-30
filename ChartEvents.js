//ChartEvents.js
var ee = require("event-emitter");
var emitter = ee({});
var axis = require("./xaxis/axis");
require("./rect/hide");
d3.select("svg").append("rect").attr({
  width:100,
  height:100,
  x: 100,
  y:2
})

emitter.on('onButtonClick',(time)=>{
  console.log("the time when you click the button",time);
});

emitter.on('onFontChange',function(data){
  axis(data);
});
emitter.on('onAxisToggle',function(data){
  axis.toggle();
});
emitter.on('onAxisHide',function(data){
  axis.hide();
});
module.exports = emitter;
