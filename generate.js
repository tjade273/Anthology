var fs = require('fs');
var path = require('path');
var q = require('q');
var def = q.defer();
var dir = path.normalize(process.argv[2]);
var readdir = q.denodeify(fs.readdir);
var readFile = q.denodeify(fs.readFile);
function readFiles(files){
  var text = []
  files.forEach(function(file){
    text.push(readFile(path.join(dir,file),'utf8'))
  })
  return text
}

function combine(arr1,arr2){
  var obj = {}
  console.log("combining...")
  for(i=0;i<arr1.length;i++){
    obj[arr1[i]]=arr2[i];
  }
  return obj
}
function concat(arr1,arr2){
  return arr1+arr2
}
//REMINDER: call concat after returning q.all(text), then spread
readdir(dir)
  .then(readFiles,console.error)
  .then(q.all)
  .
