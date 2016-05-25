var d3 = require('d3');
var translate = require('../utils/translate');
var _ = require("underscore");
var horizontalResize = require('../behaviors/horizontalResize');
var emitter = require("../ChartEvents");
var getConfig = (config,opts)=>_.extend(config,opts);

var axis = require("../axis/axis");
var n = 2, // number of samples
    m = 4; // number of series

var data = d3.range(m).map(function() { return d3.range(n).map(Math.random); });
let config = {
  data: data,
  numSeries: function(){
    return this.data.length;  
  }
  ,
  numSamples:function(){
    return this.data[0].length || 1 
  }
  
}



var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var yScale = d3.scale.linear()
    .domain([0, 1])
    .range([height, 0]);

var outerScale = d3.scale.ordinal()
    .domain(d3.range(config.numSamples()))
    .rangeBands([0, width], 0);

var innerScale = d3.scale.ordinal()
    .domain(d3.range(config.numSeries()))
    .rangeBands([0, outerScale.rangeBand()]);

var z = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(outerScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");
    
window.d3 = d3;
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("svg:g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// svg.append("g")
//     .attr("class", "y axis")
//     .call(yAxis);

// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);
let barConfig = ()=>{
    return {
      width: ()=>innerScale.rangeBand(),
      height: yScale,
      x: (d,i)=> outerScale(i),
      y: (d,i)=> height-yScale(d)
    }
  }


svg.append("g").selectAll("g")
    .data(data)
  .enter().append("g")
    .style("fill", function(d, i) { return z(i); })
    .attr("transform", function(d, i) { return "translate(" + innerScale(i) + ",0)"; })
  .selectAll("rect")
    .data(function(d) { return d; })
  .enter().append("rect")
    .attr(barConfig());


function bars(opts){
  config = getConfig(config,opts);
  
}