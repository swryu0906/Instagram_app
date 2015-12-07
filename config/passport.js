'use strict';

let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user');


let config = function(passport) {
  passport.serializeUser(function(user, done) {
  		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
  		User.findById(id, function(err, user) {
    		done(err, user);
  		});
	});


  /**
   * local-login paspport LocalStrategy
   */

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      let findAndCompareUser = function(){
    		User.findOne({ email: req.body.email }, function(err, user) {
    			if (err) {
            console.log('Error: ' + err);
    				return done(err);
    			}
          // whether user exists
    			if(!user){
            console.log('Error: User is not found');
    				req.flash('error','User is not found');
    				return done(null, false);
    			} else {
      			// Is Password Valid?
            console.log('user: \n' + user);
            console.log('user.password: ' + user.password);
            user.comparePassword(password, (err, isMatch) => {
              if (err) {
                console.log('Error: ' + err);
                return done(err)
              }
              if (isMatch) {
                console.log('Success: You are successfully logged in');
                req.flash('success', 'You are successfully logged in');
                return done(null, user)
              } else {
                console.log('Error: Password is invalid');
                req.flash('error', 'Password is invalid');
                return done(null, false);
              }
            });
          }
      	});
      }
      process.nextTick(findAndCompareUser);
    }
  ));


  /**
   * local-register paspport LocalStrategy
   */

  passport.use('local-register', new LocalStrategy({
      passReqToCallback: true
    },
    function(req, email, password, done) {
      let findOrCreateUser = function() {
        // Find a user with this email
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            console.log('Error: '+ err);
            return done(err);
          }
          // whether user exist or not
          if (user) {
            console.log('Error: The email already exists');
            return done(null, false, req.flash('error','Email already exists'));
          } else {
            let newUser = new User();
            if (req.body.firstName) newUser.name.firstName = req.body.firstName;
            if (req.body.lastName) newUser.name.lastName = req.body.lastName;
            if (req.body.middleName) newUser.name.middleName = req.body.middleName;
            if (req.body.username) newUser.username = req.body.username;
            if (req.body.email) newUser.email = req.body.email;
            if (req.body.password) newUser.password = req.body.password;

            // Add a new user
            User.create(newUser, function(err, user){
              if(err){
                console.log('Error: '+ err);
                throw err;
              } else {
                console.log('Success: You are now registed and logged in')
                req.flash('success','You are now registered and logged in');
                return done(null, newUser);
              }
            });
           }
         });
       };
       process.nextTick(findOrCreateUser);
     }
   )
 );
};


module.exports = config;
