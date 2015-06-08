var fs = require('fs');
var path = require('path');
var q = require('q');
var readdir = q.denodeify(fs.readdir);
var readFile = q.denodeify(fs.readFile);
var fileList = []
function readFiles(files){
  var text = []
  fileList = files
  files.forEach(function(file){
    text.push(readFile(path.join(dir,file),'utf8'))
  })
  return text
}

function combine(arr1,arr2){
  var obj = {}
  for(i=0;i<arr1.length;i++){
    obj[arr1[i].replace(/_/g,"")]=arr2[i];
  }
  return obj
}
function concat(arr1){
  list = [fileList,arr1]
  return list
}
module.exports = function(directory){
dir = path.normalize(directory);
return readdir(dir)
  .then(readFiles,console.error)
  .then(q.all)
  .then(concat)
  .spread(combine)
}
