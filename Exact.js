'use strict';
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const request = require("request");

class Exact{
  constructor(config){

  }
  case(num){
    if(num){
      this.num = num;
      return this;
    }
    return this.num;

  }
  engine(ver){
    if(ver){
      this.version = ver;
      return this;
    }
    return this.engine;
  }
  url(){
    return this.num + "_" + this.engine;
  }
  request(){
    return new Promise((resolve)=>{
      request('http://espn.com',(err,res,body)=>{
          this.body = body;
          resolve(body);
      });
    });
  }
  write(blob){
    return fs.writeFileAsync(__dirname+"helloworld1.json",this.body);
  }
  wait(time,fn){
    return new Promise((resolve)=>{
      setTimeout(resolve(()=>{
        return 123;
      }
      ),500);
    });
  }
}
var file = ()=>{
  return fs.readFileAsync("data.json")
    .then(x=>{
      return x.toString();
    });
}
var exact = new Exact();
exact.wait(234,(d)=>{
  console.log(d)
},12);
