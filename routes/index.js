var express = require('express');
var router = express.Router();
var gen = require('../local_modules/gen_async')
var path = require('path')
var homedir = './public/text/'
var verify = require('../local_modules/verify')
var write = require('../local_modules/write')
var read = require('../local_modules/read')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/submit',function(req,res,next){
      res.render('submit',{serv_errors:[]});
});
router.get('/cites',function(req,res,next){
  read("../text/citations.csv",function(err,data){
    res.render('cites',{cites:data})
  })
});
router.get('/table',function(req,res,next){
  res.render('table')
});
router.get('/simple',function(req,res,next){
  gen(homedir+'simple',function(err,data){
    if(err){
      console.log(err)
    }
    else{
      res.render('section',{stories:data, title:"Simple"});
    }
  });
});
router.get('/elegant',function(req,res,next){
  gen(homedir+'elegant',function(err,data){
    if(err){
      console.log(err)
    }
    else{
      res.render('section',{stories:data, title:"Elegant"})
    }
  })
})
router.get('/powerful',function(req,res,next){
  gen(homedir+'powerful',function(err,data){
    if(err){
      console.log(err)
    }
    else{
      res.render('section',{stories:data, title:"Powerful"})
    }
  })
})
router.get('/collaborative',function(req,res,next){
  gen(homedir+'collaborative',function(err,data){
    if(err){
      console.log(err)
    }
    else{
      res.render('section',{stories:data, title:"Collaborative"})
    }
  })
})
router.get('/precise',function(req,res,next){
  gen(homedir+'precise',function(err,data){
    if(err){
      console.log(path.join(__dirname,'/../public/text/precise'))
      console.log(err)
    }
    else{
      console.log('rendering...')
      res.render('section',{stories:data, title:"Precise"})
    }
  })
})
router.get('/acknowledge', function(req,res,next){
  res.render('acknowledge')
})

router.post('/submit',function(req,res,next){
  console.log(req.body.title)
  console.log(req.body.token)
  console.log(req.body.editor1)
  verify(req,function(err,data,name){
    if(err){
      console.log("Error:")
      console.log(err)
      res.render('submit',{serv_errors:err})
    }
    else{
      console.log(data)
      write(data,name,console.log)
      res.render('submit',{serv_errors:[]})
    }
  })

});
module.exports = router;
