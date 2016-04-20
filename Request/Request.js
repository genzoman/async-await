'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const request = require("request");
var _ = require("underscore");
let promise = (resolve,reject)=>{
  return new Promise(resolve,reject);
}

class Exact{
  constructor(config){
    this.baseUrl = config.baseUrl;
  }
  get(){
    return new Promise((resolve)=>{
      request(this.baseUrl,(err,res,body)=>{
        resolve(res.body);
      });
    });
  }
}

module.exports = Exact;
