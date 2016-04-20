 'use strict';
const Request = require("./Request/Request")
const google = new Request({baseUrl:'http://espn.go.com/nba/boxscore?gameId=400828937' });
const querySelectorAll = require("query-selector");
const jsdom = require("jsdom").jsdom;
const fs = require('fs');
const table2Json = require("tabletojson");
google.get().then(page=>{
  debugger;
  var page = jsdom(page);
  var tables = page.querySelectorAll("table");
  for(var prop in tables){
      let html = tables[prop].innerHTML;
      fs.writeFileSync("./"+prop+".txt",html);
      console.log(html);

  }
  function getHTML(elem){
    return elem.innerHTML;
  }
  process.exit(0);
});
