var d3 = require('d3');
var translate = require('../utils/translate');
var _ = require("underscore");
var horizontalResize = require('../behaviors/horizontalResize');
var emitter = require("../ChartEvents");
var getConfig = (config,opts)=>_.extend(config,opts);

var axis = require("../axis/axis");


var data = d3.range(4).map(function() { return d3.range(2).map(Math.random); });
let config = {
  data: data,
  numSeries: function(){
    return this.data.length;  
  }
  ,
  numSamples:function(){
    return this.data[0].length || 1 
  },
  height: 400,
  width: 800,
  xAxis:function(opts){
     return getConfig.call(this,this,opts);
  },
  yAxis:(opts)=>{
    return getConfig.call(this,this,opts);
  }
  
}

var xConfig = config.xAxis(
    {
      id: 'xAxis',parent:'svg', orient: "bottom", data: ['a','b','c','d']
    });

var yConfig = config.yAxis(
  {
    id: 'yAxis', parent: 'svg',orient: 'left',data: data
  });

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;



var z = d3.scale.category10();


    
window.d3 = d3;
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("svg:g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


let barConfig = ()=>{
    return {
      width: ()=>innerScale.rangeBand(),
      height: yScale,
      x: (d,i)=> outerScale(i),
      y: (d,i)=> height-yScale(d)
    }
  }





function bars(opts){
  config = getConfig(config,opts);
  
  var yScale = d3.scale.linear()
    .domain([0, 1])
    .range([config.height, 0]);

var outerScale = d3.scale.ordinal()
    .domain(d3.range(config.numSamples()))
    .rangeBands([0, config.width], 0);

var innerScale = d3.scale.ordinal()
    .domain(d3.range(config.numSeries()))
    .rangeBands([0, outerScale.rangeBand()]);
  
  //
  let barConfig = ()=>{
    return {
      width: ()=>innerScale.rangeBand(),
      height: yScale,
      x: (d,i)=> outerScale(i),
      y: (d,i)=> {
       return height-yScale(d); 
      }
    }
  }

  //
  
  var xAxis = axis(xConfig);
  var yAxis = axis(yConfig);
  var translate_ = `translate(${margin.left},${margin.top})`;
   var g = d3.select("svg").append("g").attr("id","group");
    
  g.selectAll("g")
    .attr("transform",translate_)
    .data(data)
  .enter()
    .append("g")
    .style("fill", function(d, i) { return z(i); })
    .attr("transform", function(d, i) { 
      //return "translate(" + innerScale(i) + ",0)";
      return `translate(${innerScale(i)},0)`; 
      
    })
  .selectAll("rect")
    .data(function(d) { return d; })
  .enter().append("rect")
    .attr(barConfig());
  
}
bars();