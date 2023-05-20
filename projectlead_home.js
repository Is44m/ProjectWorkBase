var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  var currentuser = req.session.currentuser;
  if(currentuser == undefined)
  {
    res.redirect('/login');
  }
  else
  {
  var query = "select * from users where User_ID = "+currentuser+";";
  database.query(query, function(error, data){
    if(error) throw error;
    if(data.length==0 || data[0].USER_TYPE !='Project Lead')
    {
      res.redirect('/login');
    }
    else
    {
      var q2 = 'select * from project where Lead_ID= ? ;'
      database.query(q2, [currentuser],(err, results) => {
        if (err) throw err;
        res.render('projleadhome', {title:'Node.js MySQL Connection', action:'list', userprops:data, allprojslist:results, message:req.flash('success')});
      }); 
    }
     console.log("Project Lead Homepage | This user is: ",currentuser)

})
  }
})


router.get('/workflow', function(req, res, next) {
  var currentuser = req.session.currentuser;
  if(currentuser == undefined)
  {
    res.redirect('/login');
  }
  else
  {
  var query = "select * from users where User_ID = "+currentuser+";";
  database.query(query, function(error, data){
    if(error) throw error;
    if(data.length==0 || data[0].USER_TYPE !='Project Lead')
    {
      res.redirect('/login');
    }
    else
    {
      var q2 = 'select * from project where Lead_ID= ? ;'
      database.query(q2, [currentuser],(err, results) => {
        if (err) throw err;
        res.render('projlworkflow', {title:'Node.js MySQL Connection', action:'list', userprops:data, allprojslist:results, message:req.flash('success')});
      });


    }
     console.log("Create User | This user is: ",currentuser)
})
  }
})




router.get('/reports', function(req, res, next) {
  var currentuser = req.session.currentuser;
  if(currentuser == undefined)
  {
    res.redirect('/login');
  }
  else
  {
  var query = "select * from users where User_ID = "+currentuser+";";
  database.query(query, function(error, data){
    if(error) throw error;
    if(data.length==0 || data[0].USER_TYPE !='Project Lead')
    {
      res.redirect('/login');
    }
    else
    {
      res.render('projlreports', {title:'Node.js MySQL Connection', action:'list', userprops:data, message:req.flash('success')});
    }
     console.log("Repors | This user is: ",currentuser)
})
  }
})



router.get('/createproject', function(req, res, next) {
  var currentuser = req.session.currentuser;
  if(currentuser == undefined)
  {
    res.redirect('/login');
  }
  else
  {
  var query = "select * from users where User_ID = "+currentuser+";";
  database.query(query, function(error, data){
    if(error) throw error;
    if(data.length==0 || data[0].USER_TYPE !='Project Lead')
    {
      res.redirect('/login');
    }
    else
    {
      res.render('createproject', {title:'Node.js MySQL Connection', action:'list', userprops:data, message:req.flash('success')});
    }
     console.log("Create User | This user is: ",currentuser)
     req.session.addsucc = 0;
})
  }
})


module.exports = router;
