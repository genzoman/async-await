var d3 = require("d3");
var ee = require("event-emitter");
var emitter = require("../ChartEvents");

var button = d3.select("body")
  .append("div")
  .text("CLICK 121ME")
  .on("click",function(){
  emitter.emit("onFontChange",{
    'font-size': '11pt',
    'fill': 'purple'
  });
});
/*
  aqui tenemos
  la mujer mas lindaen todo del mundo

  se llama azul,
  i heard from the bar in the hotel where i was drinking
  creo que me gusta la manera you smile when
  no sabes que estoy mirando



*/
