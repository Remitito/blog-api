var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const User = require('./models/user');
require('dotenv').config();

var indexRouter = require('./routes/index');

var app = express();

const mongoDb = 'mongodb+srv://dbUser:dbPass@cluster0.1jvie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./modules/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});
// error handler
//app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
//});

module.exports = app;

// DEBUG=blogapi:* npm run devstart