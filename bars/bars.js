var d3 = require('d3');
var translate = require('../utils/translate');
var _ = require("underscore");
var horizontalResize = require('../behaviors/horizontalResize');
var emitter = require("../ChartEvents");

var config = {
  svg: null,
  domain:null,
  barPadding:null,
  height:250,
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

let getConfig = (config,newOpts)=> _.extend(config,newOpts);


function bars(opts){
  config = getConfig(config,opts);
  var x = d3.scale.ordinal()
      .rangeRoundBands([0, config.width], .1)
      .domain([0,100]);

  var svg = d3.select('svg');
  var y = d3.scale.linear().range([config.height,0]);
  var bar = svg.selectAll("g").data(config.data).enter().append("g");

  bar.append("rect")
     .attr("y", function(d) { return y(d); })
     .attr("x",function(d,i){
       return i * 80 + 2;
     })
     .attr("transform",function(d,i){
       return `translate(${i * 10},10)`;
     })
     .attr("height", function(d) { return config.height - y(d); })
     .attr("width", x.rangeBand())
     .style("fill","blue");

 bar.append("text")
     .attr("x", x.rangeBand() / 2)
     .attr("y", function(d) { return y(d) + 3; })
     .attr("dy", ".75em")
     .text(function(d) { return d; });
  return bars;
}
bars();
module.exports = bars;
