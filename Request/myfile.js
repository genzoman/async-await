'use strict';
var co = require("co");
const Request = require("./Request")
const google = new Request({baseUrl:'http://espn.go.com/nba/boxscore?gameId=400828937' });
var Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
function delay(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}
var events = require('events');
var eventEmitter = new events.EventEmitter();


class Chart {

  constructor(config){
    let _subscribe = ()=>{
      Object.keys(Chart.events()).map(e=>{
        eventEmitter.on(e,Chart.events()[e]);
      });
    }
    _subscribe();
    eventEmitter.emit('onChartCreated',+new Date());

  }

  draw(){
    console.log("drawing chart");
    eventEmitter.emit('onChartDraw',[1,2,3,4,5])
  }
  static subscribe(){
    Object.keys(Chart.events()).map(e=>{
      eventEmitter.on(e,Chart.events()[e]);
    });
  }
  static events(){
    return {
      onChartDraw:(event)=>{
        console.log("new event!",event);

      }
    }
  }
}
class Component{
  consturctor(data){
    this.data = data;
  }
}
var ringBell = function ringBell(test)
{
  console.log(`ring ring ring ${test}`);
}
eventEmitter.on('doorOpen', ringBell);

eventEmitter.on('onChartDraw',(data)=>{
  console.log("onChartDrawData2",data);
});
eventEmitter.on('onChartCreated',(time)=>{
  console.log("this is the time:: ",time);
});





delay(500)
.then(_=>{
  var chart = new Chart();
  chart.draw();
  eventEmitter.emit('onChartDraw',{
    time: +new Date()
  })
})
.then(_=>{
  _ = "lol";
  return _;
})
.then(_=>{
  console.log(_,"helloklj");
})
