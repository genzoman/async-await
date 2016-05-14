var d3 = require('d3');
var horizontalResize = require('./horizontalResize');
var verticalResize = require('./verticalResize');
function shrink(config){
  var dragObj = (config.orient==="bottom" || config.orient==="top") ?
    dragObj = {
      "dragstart":()=>{},
      "drag":function(){
        return horizontalResize.call(this,{width:config.width})
      },
      "dragend":()=>{}
    }
    :
    dragObj = {
      "dragstart":()=>{},
      "drag":function shrink(){
        axis(verticalResize.call(this,{
          height: config.height
        }));
      },
      "dragend":()=>{}
    }
    return d3.behavior.drag()
      .on('dragstart',dragObj.dragstart)
      .on('drag',dragObj.drag)
      .on('dragend',dragObj.dragend);
    
}
