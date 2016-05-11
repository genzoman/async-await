'use strict';
var d3 = require('d3');
var translate = require("../utils/translate");
var _ = require("underscore");
var getConfig = (config,opts)=> _.extend(config,opts);
var config = {
  translate:''

}
module.exports = horizontalResize;

function horizontalResize(opts){

  var mouse = opts.mouse || d3.mouse(this),
    currTransform = opts.translate || d3.transform(d3.select(this).attr("transform")).translate,
    isRightDrag = mouse[0] < opts.width/2,
    factor = isRightDrag ? 1 : -1,
    event = opts.event || d3.event;
console.log("mouse x: ",mouse,"event",d3.event);

var translate_ = `translate(${currTransform[0] + mouse[0]+ (factor * event.dx)},${currTransform[1]})`;


  let getRightDrag= ()=>{

    return opts.width - (factor * event.dx);
  }
  let getLeftDrag = ()=>{
    console.log("left drag")
    return mouse[0] - (factor * event.dx);
  }
  let getWidth = ()=>{
     if(isRightDrag){
       return getRightDrag();
     }
     return getLeftDrag();
  }



  return {
    width: getWidth(),
    translate: translate_
  }
}
