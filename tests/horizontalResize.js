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
describe("axis changes after resize",function(){
  var currState = {},nextState = {},translate='';
  describe("left side drag resize",function(){

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
      translate = translateAsArray(nextState.translate);
      assert.equal(currState.width,nextState.width+=1);
      //should increase the x translate
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
  describe("right side drag resize",function(){
    currState = {
      mouse: [100,1000],
      translate: [100,100],
      width: 81,
      event:{
        dx: 1
      }
    }
    it("should up width by 1, no effect on translate",function(){
      nextState = horizontalResize(currState);
      assert.equal(currState.width+=1,nextState.width);
      //no translate change
      translate = translateAsArray(nextState.translate);
      assert.equal(translate[0],currState.translate[0]);
    });
    it("should decrease the width by 1, no effect on translate",function(){
      //when you're mocking this make sure the mouse[0] <= width
      currState = {
        mouse: [81,0],
        translate: [0,0],
        width: 81,
        event:{
          dx: -1
        }
      }
      nextState = horizontalResize(currState);
      console.log(nextState);
      assert.equal(nextState.width,currState.width-=1);
      //no translate change


    });
  });

});
