'use strict';

var d3 = require("d3");
var Promise = require("bluebird");
var _ = require("underscore");
var translate = require("../utils/translate");
var resize = require("../behaviors/resize");
var config = {
  svg: null,
  domain:null,
  barPadding:null,
  parent:null,
  width: 200,
  height:200,
  font:{
    'font-size': '12pt',
    'fill': 'blue'
  },
  id:null,
  data: [1,2,3,4],
  drag: null,
  group: '',
  orient: 'left',
  hasDrag: true
}

d3.select("svg").attr({
  height: 1000,
  width:1000
});

let getOrdinalDomain = (data,key)=>config.data;
let getLinearDomain = ()=>[0,d3.max(config.data)];
let getDomain = ()=> {
  return config.orient==="left" ? getLinearDomain() : getOrdinalDomain();
};

let getConfig = (config,newOpts)=> _.extend(config,newOpts);
let getTextElems = ()=> d3.select(config.id).selectAll("text");
let getRange = ()=> [config.height,0];
let getScale = ()=>{
  return config.orient==="left" ? linearScale() : ordinalScale();

}
let ordinalScale = ()=>{
  return d3.scale.ordinal().domain(getDomain(config.data))
    .rangeRoundBands([0,config.width],config.barPadding || .1);
}
let linearScale = ()=>{
  return d3.scale.linear().range(getRange()).domain(getDomain());
}
let axisTranslate = ()=>{
  return config.orient==="bottom" ? translate(100,10+config.height)
    : translate(100,10);
}

let getAxis =()=> {
  return d3.svg.axis()
    .scale(getScale())
    .orient(config.orient)
    .ticks(10)
    .tickSize(1);
}
window.axis;
function axis(opts){
  config = getConfig(config,opts);

  if(!d3.select(config.id).size()){
    config.group = d3.select(config.parent)
      .append("g")
      .attr("id",config.id)
      .attr("transform",axisTranslate());

      config.group.call(getAxis());

  }
  else{
    if(config.translate)
      return config.group
        .call(getAxis())
        .attr("transform",config.translate);
    else
      return config.group.call(getAxis())
  }
  axis.font = function(opt){
    config = getConfig(opt);
    dy = config.orient === "left" ? ".32em" : ".71em";
    getTextElems().style({
      'font-size': config.font['font-size'],
      'font-family': config.font['font-family'],
      'fill': config.font['fill'],
      'dy': dy
    })


    return axis;
  }
  axis.width = ()=>config.width;
  axis.height = ()=>config.height;
  axis.config = ()=>config;

  axis.drag = ()=>{
    var noDrag = d3.behavior.drag()
      .on("dragstart",null)
      .on("drag",null)
      .on("dragend",null);
    if(config.hasDrag)
      config.group.call(resize.call(this,axis,config));

    else config.group.call(noDrag);

    return axis;
  }

  return axis;
}



module.exports = axis;
