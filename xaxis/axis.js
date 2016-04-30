var d3 = require('d3');
var translate = require('../utils/translate');
var _ = require("underscore");
var horizontalResize = require('../behaviors/horizontalResize');
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
  enable: true
}
window.axis = axis;
let getDomain = (data,key)=> config.data;
let getConfig = (config,newOpts)=> _.extend(config,newOpts);
let getTextElems = ()=> d3.select("#xAxis").selectAll("text");
require("./transitions/hide");
require("./transitions/width");

//EXPORT
module.exports = axis;

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
          .attr("transform",translate(100,100))

      if(!config.enable){
        config.group.style("display","none");
      }
    }
    config.group.call(getAxis()).style("display", config.enable ? null: "none");
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
  //
  axis.width = ()=>config.width;
  //
  axis.drag = (opt)=>{
  var drag = d3.behavior.drag()
    .on('dragstart',opt.dragstart)
    .on('drag',opt.drag)
    .on('dragend',opt.dragend);
    config.group.call(drag);
    return axis;
  }

  render();
  return axis;
}
let shrink = ()=>{
  return{
    "dragstart":()=>{},
    "drag":function shrink(){
      axis({
        width: horizontalResize.call(this,{width:config.width})
      });
    },
    "dragend":()=>{}
  }


}
