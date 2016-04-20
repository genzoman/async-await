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
  orient: 'bottom'
}

let getDomain = (data,key)=> config.data;
let getConfig = (config,newOpts)=> _.extend(config,newOpts);
let getTextElems = ()=> d3.select(".x").selectAll("text");

function axis(opts){
  config = getConfig(config,opts);

  let getScale = ()=>{
    return d3.scale.ordinal().domain(getDomain(config.data))
      .rangeRoundBands([0,config.width],config.barPadding || .1);
  }

  let getAxis = ()=> d3.svg.axis().scale(getScale()).orient(config.orient);

  

  let render = ()=>{
    if(!d3.select('#xAxis').size()){
        config.group = d3.select(config.id)
          .append("g")
          .attr("id","xAxis")
          .attr("transform",translate(100,100));
    }
    config.group.call(getAxis());
    for(let prop in config.font){
      getTextElems().attr(prop,config.font[prop]);
    }
    return axis;
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
axis({
  id: '#svg'
}).drag({
  "dragstart":()=>{},
  "drag":function shrink(){
    axis({
      width: horizontalResize.call(this,{width:config.width})
    });
  },
  "dragend":()=>{}
})
