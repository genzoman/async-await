'use strict';
var assert = require("assert");
var expect = require("chai").expect;

let translateAsArray = (str)=>{
  var leftParen = +str.indexOf('(');
  leftParen++;
  var comma = +str.indexOf(',');
  comma++;
  var rightParen = +str.indexOf(')');

  var x = str.slice(leftParen,comma-=1);
  var y = str.slice(comma+=1,rightParen);
  return [x,y];
}
var horizontalResize = require("../behaviors/horizontalResize");
describe("left side drag resize",function(){
  var currState = {};
  var nextState = {};
  it("should lower width by 1 if you drag right and up translateX",function(){
    currState = {
      mouse: [1,0],
      translate: [100,100],
      width: 81,
      event:{
        dx: 1
      }
    }

    nextState = horizontalResize(currState);
    var translate = translateAsArray(nextState.translate);
    console.log("width",currState.width);
    assert.equal(currState.width,nextState.width+=1);
    //should increase the x translate
    var t = translate[0];
    console.log('asdfasdfasdfasdfs',t);
    assert.equal(translate[0],currState.translate[0]+=2);

  });
  it("should up width by 1 if draged left, no effect on translate",function(){
    currState = {
      mouse: [1,0],
      translate: [100,100],
      width: 81,
      event:{
        dx: -1
      }
    }
    var nextState = horizontalResize(currState);


    assert.equal(currState.width+=1,nextState.width);
  });
});
