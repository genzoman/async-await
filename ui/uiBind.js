//uiBind.js
const d3 = require("d3");
const _ = require("underscore");
const axis = require("../yaxis/axis");
var ee = require("event-emitter");
var emitter = ee({});
emitter.on('onFontChanged',function(data){
  console.log("hello world",data);
});

let getConfig = (config,opts) => _.extend(config,opts);
let config = {
  name: '',
  parent:'body',
  tagName: 'input',
  id: 'checkbox',
  attr:{
    type: "checkbox",
    "checked": "checked"
  },
  boundTo:{
    
  }

}
function uiBind(obj){
  config = getConfig(config,obj);
  var g = d3.select(config.parent)
    .attr("id",config.id)
    .append(config.tagName)
    .attr(config.attr)
    .on("change",function(){
      emitter.emit('onFontChanged',axis.config());
    });

}
axis({
  height: 100,
  parent: '#svg',
  orient: "left"
});

uiBind(config)
