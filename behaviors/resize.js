'use strict';
//resize.js
var d3 = require('d3');
var horizontalResize = require('./horizontalResize');
var verticalResize = require('./verticalResize');
var emitter = require("../ChartEvents");


module.exports = resize;
function resize(axis,config){
  var dragObj = (config.orient==="bottom" || config.orient==="top") ?
    dragObj = {
      "dragstart":()=>{},
      "drag":function(){
        var data = horizontalResize.call(this,{width:config.width});
        emitter.emit('onResize',data);
      },
      "dragend":()=>{}
    }
    :
    dragObj = {
      "dragstart":()=>{},
      "drag":function(){
        
        var data = verticalResize.call(this,{
          height: config.height
        });
        
        emitter.emit('onResize',data); 
      },
      "dragend":()=>{}
    }
    return d3.behavior.drag()
      .on('dragstart',dragObj.dragstart)
      .on('drag',dragObj.drag)
      .on('dragend',dragObj.dragend);

}
