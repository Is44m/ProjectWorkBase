var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.failedloginatt = 0;
  res.render('landingpage', { title: 'Express' });
});

module.exports = router;
