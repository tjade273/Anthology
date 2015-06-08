var fs = require('fs')
module.exports = function(file,callback){
  fs.readFile('./public/text/citations.csv','utf8',function(err,data){
    var arr = data.split("\n")
    callback(err,arr);
  })
}
