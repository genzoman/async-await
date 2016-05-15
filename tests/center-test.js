//TODO write an actually meaningful test
'use strict';
var center = require('../positions/center');
var assert = require('assert');
var _ = require("underscore");
var domMock = {
  x:0,
  y:0,
  tagName:null,
  width:0,
  height:0,
  translateX:0,
  translateY:0,
  absolutePosition:function(){
    return [this.x + this.translateX,this.y+this.translateY];
  },
  translate(){
    return [this.translateX,this.translateY];
  },
  attr:function(type){
    return this[type];
  }
}

describe("centering coordinates",function(){
  var parent;
  it("it should be equidistant on all sides if center",function(){
    debugger;
    parent = _.extend(domMock,{
      x:100,
      y:90,
      width:5000,
      tagName: 'rect',
      height:52
    });

    var el = _.extend(domMock,{
      x:0,
      y:50,
      width:16,
      tagName: 'rect',
      height:16
    })

    var deadCenter = center.call(el,parent,'center');
    console.log(deadCenter);
    //assert.equal(deadCenter[0],parent.width + (el.width/2));
  });
});
