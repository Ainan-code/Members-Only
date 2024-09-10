var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require("express-session");
const passport = require("passport");


var userRouter = require('./routes/usersRoutes');
var authRouter = require('./config/passportConfig');
const bodyParser = require("body-parser");
const messageRoutes = require('./routes/messageRoutes');

const User  = require('./models/User');
const MongoStore = require('connect-mongo');


const connectToMongo = require("./config/database");;

connectToMongo();

require('dotenv').config();


var app = express();





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

app.use('/public', express.static('public'));

/*
  Session configuration and utilization of the MongoStore for storing
  the session in the MongoDB database
*/

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongoUrl: process.env.db_url,
    dbName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

   /*
  Setup the local passport strategy, add the serialize and 
  deserialize functions that only saves the ID from the user
  by default.
*/



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));



app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', messageRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});








app.listen(3000, () => console.log("app listening on port 3000!"));

module.exports = app;                                                                         
