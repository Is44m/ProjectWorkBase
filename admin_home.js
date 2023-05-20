var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.failedloginatt = 0;
  req.session.addsucc = 0;
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
    if(data.length==0 || data[0].USER_TYPE !='Admin')
    {
      res.redirect('/login');
    }
    else
    {
      var query2 ="select * from users;"
      database.query(query2, function(error2, data2)
    {
      if (error2) throw error;
    res.render('adminhomepage', {title:'Node.js MySQL Connection', action:'list', userprops:data, action:'list', alluserslist:data2, message:req.flash('success')});
    })
    }
      console.log("Admin Homepage | This user is: ",currentuser)
})
  }
})



router.get('/createuser', function(req, res, next) {
var currentuser = req.session.currentuser;
var addsucc = req.session.addsucc;
if(currentuser == undefined)
{
  res.redirect('/login');
}
else
{
var query = "select * from users where User_ID = "+currentuser+";";
database.query(query, function(error, data){
  if(error) throw error;
  if(data.length==0 || data[0].USER_TYPE !='Admin')
  {
    req.session.addsucc = 0;
    res.redirect('/login');
  }
  else
  {
    res.render('createuser', {title:'Node.js MySQL Connection', action:'list', userprops:data, addsucc:addsucc, message:req.flash('success')});
  }
   console.log("Create User | This user is: ",currentuser)
   req.session.addsucc = 0;
})
}
})

router.post('/createuser/add', (request, res) => {
const {un, pwd, ustype, email, profilepic} = request.body;
var creator = request.session.currentuser;
// Query the database to check if the user's credentials are valid

if(creator === null)
{
  request.session.addsucc = 0;
  res.redirect('/login');
}

else
{
const validateun = 'SELECT * FROM USERS WHERE USER_NAME = ?'
database.query(validateun, [un], (err, results2) => {
  if (err) throw err;
  if(results2.length>0)
  {
  request.session.addsucc = 1;
  res.redirect('/adminhome/createuser');
  console.log('Wrong data!');
  console.log(un,pwd)
  }
  else{
    const query = 'INSERT INTO USERS(USER_NAME, PW, USER_TYPE, Created_By_ID, Profile_Picture, Email) VALUES (?, ?, ?, ?, ?, ?);';
    database.query(query, [un,pwd,ustype, creator, profilepic, email], (err, results) => {
      if (err) throw err;
      res.redirect('/adminhome');
      console.log('Data entered');
      console.log(un,pwd)
    });
  }
});

}
});




router.post('/delete/:usertodel', (request, response) => {
  var creator = request.session.currentuser;
  var usertodel = request.params.usertodel;
  console.log("I'm about to delete", usertodel)
  // Query the database to check if the user's credentials are valid
  if (creator === null) {
    response.redirect('/login');
  } else {
    const validateun = 'SELECT * FROM USERS WHERE USER_ID = ?';
    database.query(validateun, [usertodel], (err, results2) => {
      if (err) throw err;
      if (results2.length === 0) {
        console.log('Wrong data!');
        response.redirect('/adminhome');
      } else {
        const query = 'DELETE FROM USERS WHERE USER_ID = ?;';
        database.query(query, [usertodel], (err, results) => {
          if (err) throw err;
          console.log('Deleted user:', usertodel);
          response.redirect('/adminhome');
        });
      }
    });
  }
});


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
    if(data.length==0 || data[0].USER_TYPE !='Admin')
    {
      res.redirect('/login');
    }
    else
    {
      res.render('admincreateproj', {title:'Node.js MySQL Connection', action:'list', userprops:data, message:req.flash('success')});
    }
     console.log("Create User | This user is: ",currentuser)
     req.session.addsucc = 0;
})
  }
})



router.post('/createproject/add', (request, res) => {
  const {project_name,lead_id, version_name, release, notes, project_avatar, status, start_date, end_date, element_name, order} = request.body;
  var creator = request.session.currentuser;
  
  // Query the database to check if the user's credentials are valid

  if(creator === null)
  {
    request.session.addsucc = 0;
    res.redirect('/login');
  }
  else
  {

      const query = 'INSERT INTO PROJECT(Project_Name, Lead_ID, Version_Name, Version_Release, Project_Description, Project_Avatar, Status, Start_Date, End_Date, Creator_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
      database.query(query, [project_name, lead_id, version_name, release, notes, project_avatar, status, start_date, end_date, creator], (err, results) => {
        if (err) throw err;
        var insertedProjectId = results.insertId;
        console.log(insertedProjectId);
        const query2 = 'INSERT INTO Workflow_Element(Project_ID, Element_Name, Order_No) VALUES (?, ?, ?);';
        database.query(query2, [insertedProjectId,element_name, order], (err, results) => {
          if (err) throw err;
          res.redirect('/adminhome');
        });

      });


    }
  });



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
      if(data.length==0 || data[0].USER_TYPE !='Admin')
      {
        res.redirect('/login');
      }
      else
      {
        var q2 = 'select * from project;'
        database.query(q2, (err, results) => {
          if (err) throw err;
          res.render('adminworkflow', {title:'Node.js MySQL Connection', action:'list', userprops:data, allprojslist:results, message:req.flash('success')});
        });


      }
       console.log("Create User | This user is: ",currentuser)
  })
    }
  })



module.exports = router;
