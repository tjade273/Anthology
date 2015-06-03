var fs = require('fs');
var async = require('async')
var path = require('path')
var fileObj ={}
module.exports = function(directory,call){
  var dir = path.normalize(directory)
function readFiles(mainCallback){
  async.forEachOf(fileObj,function(item,key,callback){
    fs.readFile(item,'utf8',function(err,file){
      fileObj[key]=file;
      callback(err);
    })
  },function(error){mainCallback(error,fileObj)}
  )
}
async.series([
  function(callback){
    fs.readdir(dir,function(err,files){
      files.forEach(function(val,index,array){
        fileObj[path.basename(val,'.html')] = path.join(dir,val);
      })
      callback(err,files)
    })
  },
  readFiles
],
//Main callback
function(err,results){
  if(err){call(err,null)}
  else{call(null,results[1])}
}
)
}
