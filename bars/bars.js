var d3 = require('d3');
var translate = require('../utils/translate');
var _ = require("underscore");
var horizontalResize = require('../behaviors/horizontalResize');
var emitter = require("../ChartEvents");
var getConfig = (config,opts)=>_.extend(config,opts);

var axis = require("../axis/axis");

module.exports = bars;

var samples = 3,
   n = 2
var data = d3.range(samples).map(_=> d3.range(n).map(Math.random));
//numSeries and numSamples need to figure out m,n and pass that to outer/inner Scales
let config = {
  data: data,
  numSeries: function(){
    return Array.isArray(this.data[0]) ? this.data[0].length : this.data.length;
      
  }
  ,
  numSamples:function(){
    return this.data.length || 1 
  },
  height: 400,
  width: 800
  
  
}

var series = config.numSeries();
var margin = {
  left: 50,
  top:50
}

var color = d3.scale.category10();

function bars(opts){
  config = getConfig(config,opts);
  
  var yScale = d3.scale.linear()
    .domain([0, 1])
    .range([config.height, 0]);


var outerScale = d3.scale.ordinal()
    .domain(d3.range(series))
    .rangeBands([0, config.width], 0);

var innerScale = d3.scale.ordinal()
    .domain(d3.range(config.numSamples()))
    .rangeBands([0, outerScale.rangeBand()]);
  
  //
  let barConfig = ()=>{
    return {
      width: ()=>innerScale.rangeBand(),
      height: yScale,
      x: (d,i)=> outerScale(i),
      y: (d,i)=> {
       return config.height-yScale(d); 
      }
    }
  }

  //
  let xConfig = getConfig(config.xAxis,{
    width: config.width,
    height: config.height
  });
  
  let yConfig = getConfig(config.yAxis,{
    width: config.width,
    height: config.height
  });
  
  var xAxis = axis(xConfig);
  var yAxis = axis(yConfig);
  //
  
  var translate_ = `translate(${margin.left},${margin.top})`;
   var g = d3.select("svg")
    .append("g")
    .attr("id","group")
    .attr("transform","translate(100,0)");
    
  g.selectAll("g")
    .attr("transform",translate_)
    .data(data)
  .enter()
    .append("g")
    
    .style("fill", (d, i)=> color(i))
    .attr("transform", (d, i)=>`translate(${innerScale(i)},0)`)
  .selectAll("rect")
    .data(d=>d)
  .enter()
    .append("rect")
    .attr(barConfig());
    
  bars.xAxis = ()=>xAxis;
  bars.yAxis = ()=>yAxis;
    
  return bars;
}

