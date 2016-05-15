'use strict';
var d3 = require('d3');
var translate = require('../utils/translate');
var _ = require("underscore");
var horizontalResize = require('../behaviors/horizontalResize');
var resize = require("../behaviors/resize");
var config = {
  svg: null,
  domain:null,
  parent: null,
  barPadding:null,
  width: 250,
  font:{
    'font-size': '12pt',
    'fill': 'blue'
  },
  id:'#xAxis',
  data: [1,2,3,4],
  drag: null,
  group: '',
  orient: 'bottom',
  enable: true,
  translate: ''
}

require('../bars/extensions/id-d3.js');

let getDomain = (data,key)=> config.data;
let getConfig = (config,newOpts)=> _.extend(config,newOpts);
let getTextElems = ()=> d3.select(config.id).selectAll("text");
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
    if(d3.select(config.id).size()===0){
        config.group = d3.select(config.parent)
          .append("g")
          .id("xAxis")
          .attr("transform",translate(100,20));

      config.group.call(getAxis());

      if(!config.enable){
        config.group.style("display","none");
      }
    }
    else{
      if(config.translate)
        config.group.attr("transform",config.translate);
      for(let prop in config.font){
        getTextElems().attr(prop,config.font[prop]);
      }
      config.group.call(getAxis()).style("display", config.enable ? null: "none");
      return axis;
    }


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
      config.group.call(resize.call(this,axis,config));
    return axis;
  }

  render();
  return axis;
}
axis({
  parent: 'svg'
}).drag();

require('../bars/extensions/parent-d3.js');
window.axis = axis;
module.exports = axis;
﻿
