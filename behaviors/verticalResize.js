'use strict';
var d3 = require('d3');
var translate = require("../utils/translate");
var mouse;


function verticalResize(opts){
  var mouse = opts.mouse || d3.mouse(this),
    currTransform = opts.translate || d3.transform(d3.select(this)
      .attr("transform")).translate,
    isBottomDrag = mouse[1] < opts.height/2,
    factor = isBottomDrag ? 1 : -1,
    event = opts.event || d3.event;

    var translate_ = isBottomDrag ? 
      `translate(${currTransform[0]},${currTransform[1] +  (factor * event.dy)})`
        : null;
        

    let getTopDrag = ()=>{

      return opts.height - (factor * event.dy);
    }
    let getBottomDrag = ()=>{

      return mouse[1] - (factor * event.dy);
    }
    let getHeight = ()=>{
      return getTopDrag();
    }
    return {
      height: getHeight(),
      translate: translate_
    }
}
module.exports = verticalResize;
