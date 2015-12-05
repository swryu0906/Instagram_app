'use strict'


/**
 * dependencies
 */

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let expressValidator = require('express-validator');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let mongoose = require('mongoose');

let app = express();


/**
 * path configuration
 */

app.set(express.static(path.join(__dirname, 'public')));


/**
 * parser configuration
 */

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/**
 * root route
 */

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


/**
 * register and login routes
 */

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});


/**
 * server configuration
 */

let server = app.listen(process.env.PORT || 3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Instagram App is running', 'host: ' + host, 'port: ' + port);
});
