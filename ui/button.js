var d3 = require("d3");
var ee = require("event-emitter");
var emitter = require("../ChartEvents");
var checkbox = require("./checkbox");
checkbox();
var button = d3.select("body")
  .append("div")
  .text("CLICK 121ME")
  .on("click",function(){
  emitter.emit("onFontChange",{
    font:{
      'font-size': '15pt',
      'fill': 'green'
    }
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
