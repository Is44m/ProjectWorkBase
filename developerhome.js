var express = require('express');
var router = express.Router();
var database = require('../database');
  
  



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
      if(data.length==0 || (data[0].USER_TYPE !='Developer' && data[0].USER_TYPE !='External User'))
      {
        res.redirect('/login');
      }
      else
      {
        var q2;
        if(data[0].USER_TYPE == 'Developer')
        {
            q2 = 'select * from project INNER JOIN developer_projects on developer_projects.Project_ID = Project.Project_ID where developer_projects.developer_id= ? ;'
        }
        else if (data[0].USER_TYPE == 'External User')
        {
            q2 = 'select * from project INNER JOIN ExternalUsers on ExternalUsers.Project_ID = Project.Project_ID where ExternalUsers.ExternalUser_ID= ? ;'
        }
        database.query(q2, [currentuser],(err, results) => {
          if (err) throw err;
          res.render('developerhomepage', {title:'Node.js MySQL Connection', action:'list', userprops:data, allprojslist:results, message:req.flash('success')});
        }); 
      }
       console.log("Dev/Ext Homepage | This user is: ",currentuser)
  
  })
    }
  })



  module.exports = router;