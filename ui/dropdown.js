const d3 = require("d3");
const emitter =require("../ChartEvents");
const axis = require("../xaxis/axis");
const _ = require("underscore");

axis({
  parent:'svg'
});
let binding = {
  font: axis.config().font
}
module.exports = dropdown;
function dropdown(opts){
  let select =  d3.select("body")
    .append("select")
    .attr("id","fontDropdown")
    .on("change",function(d,i){
      var index = d3.event.target.selectedIndex;
      var fontObj = opts.data[index];
      axis({
        font:{
          'font-size': fontObj['value'],
          'font-family': fontObj['family']
        }
      });
    });

let options = select.selectAll("option")
  .data(opts.data)
  .enter()
    .append("option")
    .text((d,i)=> d.text)
    .attr("value",(d,i)=>d.value);


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
dropdown({
  data: data
})
