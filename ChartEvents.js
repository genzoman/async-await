'use strict';
//ChartEvents.js
var ee = require("event-emitter");
var emitter = ee({});

//var chart = require("./charts/barchart");

emitter.on('onButtonClick',function(time){
  
});

emitter.on('onResize',function(data){
  //chart(data);
  var chart = require("./charts/barchart");
  chart(data);
});

emitter.on('onFontChange',function(data){
  //axis(data);
});
emitter.on('onAxisToggle',function(data){
  //axis.toggle();
});
emitter.on('onDragChange',function(data){
  // axis({
  //   hasDrag: data
  // });

});
emitter.on('onOrientChange',function(data){
  // axis({
  //   orient: data
  // });
});
module.exports = emitter;
