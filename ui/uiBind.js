//uiBind.js
const d3 = require("d3");
const _ = require("underscore");
const axis = require("../axis/axis");

var ee = require("event-emitter");
var emitter = require("../ChartEvents");
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
  event: {
    name: 'onDragChange',
    type: 'change',
    data: ()=>!axis.config().hasDrag,
    dispatch:(e)=>{
      emitter.emit(config.event.name,config.event.data())
    }
  }

}
function uiBind(obj){
  config = getConfig(config,obj);
  var g = d3.select(config.parent)
    .attr("id",config.id)
    .append(config.tagName)
    .attr(config.attr)
    .on(config.event.type,config.event.dispatch);

}
axis({
  height: 100,
  parent: '#svg',
  orient: "bottom",
  id: 'yAxis'
});
var newOrient = {
  name: '',
  parent:'body',
  tagName: 'input',
  id: 'checkbox',
  attr:{
    type: "checkbox",
    "checked": true
  },
  event: {
    name: 'onOrientChange',
    type: 'change',
    data: ()=>axis.config().orient==="left" ? "bottom": "left",
    dispatch:(e)=>{
      emitter.emit(config.event.name,config.event.data())
    }
  }
}
uiBind(newOrient);
uiBind(config)

//
