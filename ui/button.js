var d3 = require("d3");
var ee = require("event-emitter");
var emitter = require("../ChartEvents");
var checkbox = require("./checkbox");
//this file just add something to a prototype
//it doesn't export anything
require("../xaxis/transitions/width");


checkbox();
//width transition!
d3.select("path").transition().width(50);
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
