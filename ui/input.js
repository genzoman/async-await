var d3 = require("d3");
var eventEmitter = require("../ChartEvents");
let config = {
  event:{
    name: "onTextChange",
    type: "keyup",
    data:function(e){
      let elem = d3.event.target;
      var data_ = {
        id: elem.attributes.id.value,
        text: elem.value
      }
      return data_;
    },
    dispatch:function(e){
      eventEmitter.emit("onTextChange",config.event.data());
    }
  }
}
function input(parent,opt){
  var el = d3.select(parent)
    .append("input")
    .attr({
      type: opt.type
    })
    .attr("id","title")
    .on(config.event.type,(config.event.dispatch));


    return input;
}
input("body",{
  type: 'text'
});
