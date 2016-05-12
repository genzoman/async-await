'use strict';
var assert = require("assert");
var expect = require("chai").expect;

let translateAsArray = (str)=>{
  str = str || '';
  var leftParen = +str.indexOf('(');
  leftParen++;
  var comma = +str.indexOf(',');
  comma++;
  var rightParen = +str.indexOf(')');

  var x = str.slice(leftParen,comma-=1) || 0;
  var y = str.slice(comma+=1,rightParen) || 0;
  return [+x,+y];
}
var verticalResize = require("../behaviors/verticalResize");
var currState = {}, nextState = {}, translate = '';
describe("vertical resize",function(){

  currState = {
    mouse: [0,0],
    translate: [100,10],
    height: 81,
    event:{
      dy: 1
    }
  }
  describe("drag from top",function(){
    it("should shrink height and up translateY",function(){
      nextState = verticalResize(currState);
      assert.equal(nextState.height,currState.height-=1)
      //check translate
      nextState.translate = translateAsArray(nextState.translate);
      assert.equal(nextState.translate[1],currState.translate[1]+=1)
    });
    it('should raise height, no effect on translate',function(){
      currState.event.dy = -1;
      nextState = verticalResize(currState);
      assert.equal(nextState.height,currState.height+=1)
      //check translate
      nextState.translate = translateAsArray(nextState.translate);
      assert.equal(nextState.translate[1],currState.translate[1]-=1)
    });
  });
  describe("drag from bottom",function(){
    it("should shrink the height with negative dy",function(){
      currState.event.dy = -1;
      nextState = verticalResize(currState);
      assert.equal(currState.height+=1,nextState.height);
      var translate_ = translateAsArray(nextState.translate);
      assert.equal(currState.translate[1],translate_[1]+=1)
    });
  });
});
