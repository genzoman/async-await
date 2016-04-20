var Rx = require("rx");
const myObservable = new Rx.observable((observer)=>{
  let i =0;
  const id = setInterval(()=>{
    observer.next(i++);
  });
  return ()=>clearInterval(id);
});
