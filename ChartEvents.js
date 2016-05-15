'use strict';
//ChartEvents.js
var ee = require("event-emitter");
var emitter = ee({});
var axis = require("./axis/axis");
require("./rect/hide");

emitter.on('onButtonClick',(time)=>{
  console.log("the time when you click the button",time);
});

emitter.on('onFontChanged',function(data){
  axis(data);
});

emitter.on('onFontChange',function(data){
  axis(data);
});
emitter.on('onAxisToggle',function(data){
  axis.toggle();
});
emitter.on('onDragChange',function(data){
  axis({
    hasDrag: data
  })
});
module.exports = emitter;
