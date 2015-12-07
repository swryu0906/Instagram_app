'use strict';

let User = require('../models/user');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;


/**
 * users CRUD functions
 */

// retrieve all users
let getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: err.message,
        error: err
      });
    }
    res.status(200).json({
      success: true,
      users: users
    });
  });
};

// create a user (user registration)
let createUser = (req, res, next) => {
  // let name = req.body.name;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let middleName = req.body.middleName;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let passwordConfirmation = req.body.passwordConfirmation;

  // req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('firstName', 'First name field is required').notEmpty();
  req.checkBody('lastName', 'Last name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email must be a valid email address').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('passwordConfirmation', 'Passwords do not match').equals(req.body.password);

	let errors = req.validationErrors();

  if (errors) {
    console.log('Error: ' + errors)
    res.json({
      success: false,
      error: errors
    });
    // res.flash('error', errors)
    // res.redirect('/local-register');
  } else {
		passport.authenticate('local-register',{
			successRedirect: '/',
			failureRedirect: '/local-register',
      successFlash: true,
			failureFlash: true
		})(req, res, next)
	}
}

// retrieve one user
let getUser = (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log('Error: ' + err);
      return res.status(401).json({
        success: false,
        message: err.message,
        error: err
      });
    } else {
      return res.status(200).json({
        success: true,
        user: user
      });
    }
  });
};

// update the user
let updateUser = (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log('Error: ' + err);
      return res.status(401).json({
        success: false,
        message: err.message,
        error: err
      });
    } else {
      let userObject = { name: {} };

      if (req.body.firstName) userObject.name.firstName = req.body.firstName;
      if (req.body.lastName) userObject.name.lastName = req.body.lastName;
      if (req.body.middleName) userObject.name.middleName = req.body.middleName;
      if (req.body.username) userObject.username = req.body.username;
      if (req.body.email) {
        req.checkBody('email', 'Email must be a valid email address').isEmail();
        userObject.email = req.body.email;
      }
      if (req.body.password && req.body.passwordConfirmation) {
        req.checkBody('passwordConfirmation', 'Passwords do not match').equals(req.body.password);
        newObject.password = req.body.password;
      }
      let errors = req.validationErrors();

      if (errors) {
        console.log('Error: ' + errors)
        res.json({
          success: false,
          error: errors
        });
      } else {
        user.update({
            email: req.body.email,
            password: req.body.password
          },
          (err, updatedUser) => {
            if (err) {
              return res.status(401).json({
                success: false,
                message: err.message,
                error: err
              });
            } else {
              return res.status(200).json({
                success: true,
                message: 'User was successfully updated',
                user: updatedUser
              });
            }
          }
        );
      }
    }
  });
};

// delete the user
let deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log('Error: ' + err);
      return res.status(401).json({
        success: false,
        message: err.message,
        error: err
      });
    } else {
      user.remove((err) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: err.message,
            error: err
          });
        } else {
          return res.status(200).json({
            success: true,
            message: 'User was successfully deleted'
          });
        }
      });
    }
  });
};

// local-login
let login = (req, res, next) => {
// let login = function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email must be a valid email address').isEmail();
  req.checkBody('password', 'Password field is required').notEmpty();

  let errors = req.validationErrors();

  console.log('Error: ' + errors)

  if (errors) {
    res.json({
      success: false,
      errors: errors
    });
    // res.flash('error', 'error')
    // res.redirect('/local-login');
  } else {
    passport.authenticate('local-login', {
  		successRedirect: '/',
  		failureRedirect: '/local-login',
  		failureFlash: true
  	})(req, res, next);
  }
};

// log out
let logout = (req, res, next) => {
  req.logout();
  req.flash('success', 'You are successfully logged out');
  res.status(200).redirect('/');
};


module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  login: login,
  logout: logout
}
