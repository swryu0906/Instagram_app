'use strict'


/**
 * dependencies
 */

let express = require('express');
let path = require('path');
// let favicon = require('serve-favicon');
let logger = require('morgan');
let expressValidator = require('express-validator');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let mongoose = require('mongoose');
let nodemailer = require('nodemailer');


let app = express();

require('./config/passport')(passport);


/**
 * db configuration
 */

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/instagramAppDB')
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('mongoose connected');
});


/**
 * view engine setup
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


/**
 * favicon, parser & static path setup
 */

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * routes modules
 */

let usersRoutes = require('./routes/usersRoutes');


/**
 * express-session configuration
 */

 app.use(session({
   secret: process.env.SESSION_SECRET_KEY || 'secret',
   saveUninitialized: true,
   resave: true
 }));


/**
 * passport initialization
 */

app.use(passport.initialize());
app.use(passport.session());

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


/**
 * express-validator configuration
 */

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
     var namespace = param.split('.')
     , root    = namespace.shift()
     , formParam = root;

   while(namespace.length) {
     formParam += '[' + namespace.shift() + ']';
   }
   return {
     param : formParam,
     msg   : msg,
     value : value
   };
  }
}));


/**
 * global variables
 */

app.use(function(req, res, next){
  if (req.user) {
    res.locals.username = req.user.username;
    res.locals.user = req.user;
  }
  next();
});


/**
 * HTML rendering routes
 */

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public/index.html'));
  let options = {
    title: 'Welcome'
  };

  res.render('index', options);
});

app.get('/local-register', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public/register.html'));
  res.render('local-register', { title: 'Sign Up' });
});

app.get('/local-login', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public/login.html'));
  res.render('local-login', { title: 'Log In' });
});


/**
 * users routes
 */

app.use('/users', usersRoutes);


/**
 * server configuration
 */

let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Instagram App is running', 'host: ' + host, 'port: ' + port);
});
