const d3 = require("d3");
const emitter =require("../ChartEvents");
const axis = require("../axis/axis");
const _ = require("underscore");

axis({
  parent:'svg',
  id: 'yAxis'
});

let binding = {
  font: axis.config().font
}
var data = [
  {
    text: 'Times New Roman - 12',
    family: 'Times New Roman',
    value: '12pt'
  },
  {
    text: 'Arial - 14',
    family: 'Arial',
    value: '14pt'
  }
]
let config= {
  event:{
    name: 'onFontChange',
    type: 'change',
    data:function(d,i){
      var index = d3.event.target.selectedIndex;
      binding;
      var fontObj = data[index];

      let newFont = {
        font:{
            'font-size': fontObj['value'],
            'font-family': fontObj['family']
          }
      }
      return newFont;
    },
    dispatch:(d,i)=>{
      emitter.emit(config.event.name,config.event.data(d,i))
    }
  }
}

module.exports = dropdown;

function dropdown(opts){
  let select =  d3.select("body")
    .append("select")
    .attr("id","fontDropdown")
    .on(config.event.type,config.event.dispatch);


  dropdown.bindsTo = function(obj){
    binding = obj;
  }

  let options = select.selectAll("option")
    .data(opts.data)
    .enter()
      .append("option")
      .text(d=> d.text)
      .attr("value",d=>d.value);


  return dropdown;
}

dropdown({
  data: data
});
