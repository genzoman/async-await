'use strict';
var center = require('../positions/center');
describe("centering coordinates",function(){
  var parent;
  it("it should have an equal distance on both sides",function(){
    debugger;
    parent = {
      x: 100,
      tagName: 'rect',
      y: 100,
      width: 200,
      height:200,
      translateX: 0,
      translateY: 0,
      absolutePosition:function(){
        var x = this.x + this.translateX,
          y = this.y + this.translateY
        return [x,y];
      },
      attr:function(type){
        return this[type];
      },
      translate(){
        return [this.translateX,this.translateY];
      }
    }
    var el = {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      tagName: 'rect',
      translateX: 0,
      translateY: 0,
      absolutePosition:function(){
        var x = this.x + this.translateX,
          y = this.y + this.translateY
        return [x,y];
      },
      attr:function(type){
        return this[type];
      },
      translate(){
        return [this.translateX,this.translateY];
      }

    }
    var deadCenter = center.call(el,parent,'center');
    
  });
});
