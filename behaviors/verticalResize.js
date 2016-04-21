var d3 = require('d3');
var translate = require("../utils/translate");
var mouse;


  function verticalResize(config){
    
    mouse = d3.mouse(this);


    let getTopDrag = ()=>{

      return config.height - (factor * d3.event.dy);
    }
    let getBottomDrag = ()=>{

      return mouse[1] - (factor * d3.event.dy);
    }
    let getWidth = ()=>{
      return getTopDrag();
    }
  }
module.exports = verticalResize;
