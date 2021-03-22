var express = require('express');
var router = express.Router();
const passport = require('passport')
const {body, validationResult} = require('express-validator');
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { user: req.user, title: 'Express' });
});

router.get('/login', function(req,res) {
  res.render('login', {title: 'Login'})
})

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}))

router.post('/signup', function(req,res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  }).save(err => {
    if (err) { 
      return next(err);
    };
    res.render("login", {user: req.user,title: "Please Log In!"});
})
})

module.exports = router;
