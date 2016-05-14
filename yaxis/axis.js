'use strict';
//throwing an error when dragging
var d3 = require("d3");
var Promise = require("bluebird");
var _ = require("underscore");
var translate = require("../utils/translate");
var verticalResize = require('../behaviors/verticalResize');
var config = {
  svg: null,
  domain:null,
  barPadding:null,
  width: 250,
  height:200,
  font:{
    'font-size': '12pt',
    'fill': 'blue'
  },
  id:null,
  data: [1,2,3,4],
  drag: null,
  group: '',
  orient: 'left'
}
d3.select('svg').attr({
  height: ()=> 1000
});

let getConfig = (config,newOpts)=> _.extend(config,newOpts);
function axis(opts){
  config = getConfig(config,opts);
  let getDomain = ()=>{
    return [0,d3.max(config.data)];
  };
  let getRange = ()=>{
    return [config.height,0];
  }


  let getScale = ()=>{
    return d3.scale
      .linear()
      .range(getRange())
      .domain(getDomain());
  }
  let getAxis =()=> {
    return d3.svg.axis()
      .scale(getScale())
      .orient("left")
      .ticks(10)
      .tickSize(1);
  }
  if(!d3.select('#yAxis').size()){
    config.group = d3.select(config.id)
      .append("g")
      .attr("id","yAxis")
      .attr("transform",translate(100,10));
      config.group.call(getAxis());
  }
  else{
    if(config.translate)
      return config.group.call(getAxis()).attr("transform",config.translate);
    else
      return config.group.call(getAxis())
  }
  axis.drag = ()=>{
  var drag = d3.behavior.drag()
    .on('dragstart',shrink().dragstart)
    .on('drag',shrink().drag)
    .on('dragend',shrink().dragend);
    config.group.call(drag);
    return axis;
  }

  return axis;
}
let shrink = ()=>{
  return{
    "dragstart":()=>{},
    "drag":function shrink(){
      axis(verticalResize.call(this,{
        height: config.height
      }));
    },
    "dragend":()=>{}
  }


}
axis({height: 200,id: 'svg'}).drag();
module.exports = axis;
