var express = require('express');
var router = express.Router();
var database = require('../database');


router.get("/", function(request, response){
 	response.render("loginpage", {title:'Login to Account',failedloginatt:request.session.failedloginatt});
 });


router.post('/login', (request, res) => {
	const {uname, pwd } = request.body;
	//var User_Name = request.body.uname;
 	//var Password = request.body.pwd;
  
	// Query the database to check if the user's credentials are valid
	const query = 'SELECT * FROM users WHERE user_name = ? AND pw = ?';
	//var query = `SELECT * FROM USERS WHERE USER_NAME = "${uname}" and pw = "${pwd}")`;
	database.query(query, [uname,pwd], (err, results) => {
	  if (err) throw err;
	  if (results.length > 0) {
		// Successful login, redirect to the home page
		console.log('Correct username & password')
		request.session.failedloginatt = 0;
		var currentuser = results[0].USER_ID;
		request.session.currentuser = currentuser;
		console.log("User = ", currentuser)
		console.log(results[0].USER_TYPE)
		if(results[0].USER_TYPE=='Admin')
		{
			res.redirect('/adminhome');
		}
		else if(results[0].USER_TYPE=='Project Lead')
		{
			res.redirect('/projlhome');
		}
		else if(results[0].USER_TYPE=='Developer')
		{
			res.redirect('/devhome');
		}
		else if(results[0].USER_TYPE=='External User')
		{
			res.redirect('/devhome');
		}
		else {
			
			res.redirect('/login');
			
		}
	  } 
	  else {
		// Invalid credentials, show an error message
		request.session.failedloginatt = 1;
		console.log('Invalid username or password');
		console.log(uname,pwd)
		res.redirect('/login');
	  }
	});
  });


module.exports = router;