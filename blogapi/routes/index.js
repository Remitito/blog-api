var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Error' });
});

router.get('/login', function(req,res,next) {
  res.render('login', {title: 'Login'})
})

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/error'}))

module.exports = router;
