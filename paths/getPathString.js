var d3 = require("d3");
function getPathString(orient,config){
    var h,w;
    var sign = orient === "top" || orient === "left" ? -1 : 1;
    if(orient === "top" || orient === "left" && config.isX){
        h = sign * config.height || sign * config.outerTickSize,
        w = config.width || config.range[1];
    }
    else{
      w = sign * config.width || sign * config.outerTickSize,
      h = config.height || config.range[1];
    }
    return `M${0},${h}V0H${w}V${h}`
}

module.exports = getPathString;
