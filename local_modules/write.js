var fs = require('fs')
var path = require('path')
function sortString(str1,str2){
  var test1 = str1
  var test2 = str2
  while(!(/^[ a-z]+$/i.test(test1[0]))){
    test1=test1.slice(1)
  }
  while(!(/^[ a-z]+$/i.test(test2[0]))){
    test2=test2.slice(1)
  }
  var s = [test1,test2].sort()
  if (s[0]==test1){
    return -1
  }
  return 1
}
function clear(array){
  for (var i=array.length-1; i>=0; i--) {
    if (array[i] === "") {
        array.splice(i, 1);
    }
}
  return array
}
module.exports = function(obj,name,callback){

  var string = obj.editor1
  auth_string = "<h1>"+obj.title+"</h1>"+"<h3>By "+obj.author+"<h3>"+"<h5>Contributed by "+name+"</h5>"+string
  var file = obj.title.replace(/_/g," ")
  var file_path = path.join("./public/text/collaborative/",file)
  fs.writeFile(file_path,auth_string,function(err){
    if(err){
      callback(err,null)
    }
    else{
      fs.readFile("./public/text/citations.csv",'utf8',function(err,data){
        if(!err){
          var arr = data.split("\n")
          clear(arr.push(obj.cite))
          var sorted = arr.sort(sortString).join("\n")
          fs.writeFile("./public/text/citations.csv",sorted,function(err){
            callback(err);
          })
        }
      })
      }

  })
}
