
const d3 = require("d3");
const _ = require("underscore");
const Promise = require("bluebird");
const domAttrs = require("../dom/attrs");
window.domAttrs = domAttrs;
let getArc = ()=> {
    return d3.svg.arc()
      .outerRadius(config.outerRadius)
      .innerRadius(config.innerRadius);
}
var data = [1,2,3];
let getConfig = (config,newOpts)=> _.extend(config,newOpts);
var config = {
  innerRadius: 0,
  outerRadius: 100,
  group: '',
  colors: ["#98bbc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"],
  data: data,
  padAngle: 0
}
var color = d3.scale.ordinal().range([config.colors]);

function arc(opts){
  config = getConfig(config,opts);
  let getPie = (data)=> {
    return d3.layout.pie().sort(null).value(d=>d).padAngle(config.padAngle)(data);
  }
  arc.colors = (colors)=>{
    config = getConfig(config,{colors: colors});
    arc.render();
    return arc;
  }
  arc.data = (data)=>{
    config = getConfig(config,{data:data});
    arc.render(true);
    return arc;
  }
  arc.outerRadius = (or)=>{
    config = getConfig(config,{outerRadius: or});
    arc.render();
    return arc;
  }
  arc.innerRadius = (ir)=>{
    config = getConfig(config,{innerRadius:ir});
    arc.render();
    return arc;
  }
  arc.padAngle = (angle)=>{
    config = getConfig(config,{padAngle:angle});

    arc.render(true);
    return arc;
  }

  arc.translate = (x,y)=>{
    var str = `translate(${x},${y})`
    config.group.attr("transform",str);
    return arc;
  }
  arc.render = (remove)=>{
    if(remove){
      d3.selectAll("g").remove();
      config.group = d3.select("svg").append("g")
        .attr("transform","translate(100,100)")
        .selectAll(".arc")
        .data(getPie(config.data))
          .enter()
          .append("g");
      config.group
      .append("path")
        .attr("id",function(d,i){
          return `path_${i}`;
        })
        .attr("d",getArc())
        .style("fill",function(d,i){
          return color(d)[i];
        })
      return arc;
    }
    else{
      if(!config.group){
        config.group = d3.select("svg").append("g")
          .attr("transform","translate(100,100)")
          .selectAll(".arc").data(getPie(config.data))
          .enter().append("g");

        config.group.append("path")
          .attr("id",function(d,i){
            return `path_${i}`;
          })
          .attr("d",getArc())
          .style("fill",function(d,i){

            return color(d)[i];
          });
        return arc;
      }
      else{
        config.group.selectAll("path")
        .attr("d",getArc())
        .style("fill",function(d,i){
          var colors = color(d);
          return colors[i%colors.length-1 ];
        });
      }
    }

    return arc;

  }
  arc.render();
  return arc;
}
//end arc

window.arc = arc;
arc();
