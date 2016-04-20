const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
class File{
  constructor(config){
    this.filePath = config.filePath;
  }
  read(){
    return fs.readFileAsync(this.filePath,"utf-8");
  }
  write(data){
    return fs.writeFileAsync(this.filePath,data);
  }
}

let axis = ()=>{

}
axis.ticks = ()=>{
  console.log("hello world");
  return axis;
}
module.exports = File;
