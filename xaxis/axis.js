'use strict';
var d3 = require('d3');
var translate = require('../utils/translate');
var _ = require("underscore");
var horizontalResize = require('../behaviors/horizontalResize');
var shrink = require("../behaviors/shrink");
var config = {
  svg: null,
  domain:null,
  barPadding:null,
  width: 250,
  font:{
    'font-size': '12pt',
    'fill': 'blue'
  },
  id:null,
  data: [1,2,3,4],
  drag: null,
  group: '',
  orient: 'bottom',
  enable: true,
  translate: ''
}

let getDomain = (data,key)=> config.data;
let getConfig = (config,newOpts)=> _.extend(config,newOpts);
let getTextElems = ()=> d3.select("#xAxis").selectAll("text");
require("./transitions/hide");


//EXPORT


function axis(opts){
  config = getConfig(config,opts);

  let getScale = ()=>{
    return d3.scale.ordinal().domain(getDomain(config.data))
      .rangeRoundBands([0,config.width],config.barPadding || .1);
  }

  let getAxis = ()=> {
    return d3.svg.axis().scale(getScale()).orient(config.orient);
  }


  let render = ()=>{
    if(!d3.select('#xAxis').size()){
      config.group = d3.select(config.id)
          .append("g")
          .attr("id","xAxis")
          .attr("transform",translate(100,20))

      if(!config.enable){
        config.group.style("display","none");
      }
    }
    config.group.call(getAxis()).style("display", config.enable ? null: "none");
    if(config.translate)
      config.group.attr("transform",config.translate);
    for(let prop in config.font){
      getTextElems().attr(prop,config.font[prop]);
    }
    return axis;
  }

  axis.hide = function(){
    d3.select("path").transition().hide({
      range: [0, config.width],
      outerTickSize: 6,
      orient: config.orient
    });
  }

  axis.config = ()=> config;

  axis.toggle = function(){
    config.enable = !config.enable;

    if(config.enable){
      d3.select("path").transition().width(500);
    }
    else{
      d3.select("path").transition().hide(500);
    }


  }
  //xAxis
  axis.width = ()=>config.width;
  //
  axis.drag = ()=>{
    config.group.call(shrink.call(this,axis,config));
    return axis;
  }

  render();
  return axis;
}
axis({height: 200,id: 'svg'}).drag();
module.exports = axis;
﻿
