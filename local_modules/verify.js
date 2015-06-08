var google = require('googleapis')
var oauth = google.oauth2('v1')
var client_id = "303220019686-410qmuvhcktna11rvntufkthccvcv5t4.apps.googleusercontent.com"
module.exports= function(req,callback){
  var params = {id_token: req.body.token}
  oauth.tokeninfo(params,function(err,data){
      if(!err){
      var errors=[]
      if(data.email.split("@")[1]!="auhsdschools.org"){
        errors.push("Please sign in with an <em>auhsdschools.org</em> account")
      }
      if(data.audience!=client_id){
        errors.push("Sorry, but there was an error. Please try again later")
      }
      if(!req.body.title){
        errors.push("Please add a title")
      }
      if(!req.body.author){
        errors.push("Please add an author")
      }
      if(!req.body.editor1){
        errors.push("Text can't be empty")
      }
      if(req.body.editor1.length > 3000){
        errors.push("Text must be under 3000 characters")
      }
      if(!req.body.cite){
        errors.push("Cite your sources!")
      }
      if(errors.length){
        callback(errors,null)
      }
      if(!errors.length){
        var name = data.email.split("@")[0].replace("."," ").slice(0,-2)
        var first = name.split(" ")[0][0].toUpperCase()+name.split(" ")[0].slice(1)
        var last = name.split(" ")[1][0].toUpperCase()+name.split(" ")[1].slice(1)
        var caps = first+" "+last
        callback(null,req.body,caps)
      }
    }
    else{
      callback(["Sorry, but there was an error. Please try again later"],null)
    }
    })
}
