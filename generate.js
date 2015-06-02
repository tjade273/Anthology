var fs = require('fs');
var path = require('path');
var q = require('q');
var def = q.defer();
var dir = path.normalize(process.argv[2]);
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
  console.log("combining...")
  for(i=0;i<arr1.length;i++){
    obj[arr1[i]]=arr2[i];
  }
  return obj
}
function concat(arr1){
  list = [fileList,arr1]
  return list
}
//REMINDER: call concat after returning q.all(text), then spread
var obj = readdir(dir)
  .then(readFiles,console.error)
  .then(q.all)
  .then(concat)
  .spread(combine)
  .then(console.log)
