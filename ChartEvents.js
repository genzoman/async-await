//ChartEvents.js
var ee = require("event-emitter");
var emitter = ee({});
var axis = require("./xaxis/axis");

axis({
  width: 500,
  id: '#svg'
})
emitter.on('onButtonClick',(time)=>{
  console.log("the time when you click the button",time);
});

emitter.on('onFontChange',function(data){
  axis(data);
});
emitter.on('onFontBold',function(){

});

module.exports = emitter;
