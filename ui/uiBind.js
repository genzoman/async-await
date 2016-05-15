//uiBind.js
const d3 = require("d3");
const _ = require("underscore");
const axis = require("../axis/axis");
var ee = require("event-emitter");
var emitter = ee({});

let getConfig = (config,opts) => _.extend(config,opts);
let config = {
  name: '',
  parent:'body',
  tagName: 'input',
  id: 'checkbox',
  attr:{
    type: "checkbox",
    "checked": true
  },
  event: 'onDragChange'

}
function uiBind(obj){
  config = getConfig(config,obj);
  var g = d3.select(config.parent)
    .attr("id",config.id)
    .append(config.tagName)
    .attr(config.attr)
    .on("change",function(){
      emitter.emit(config.event,!axis.config().hasDrag);
    });

}
axis({
  height: 100,
  parent: '#svg',
  orient: "left",
  id: 'yAxis'
});

uiBind(config)
//
emitter.on('onFontChanged',function(data){
  console.log("hello world",data);
});
emitter.on(config.event,function(data){
  axis({
    hasDrag:data
  });
});
//
