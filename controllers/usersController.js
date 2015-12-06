'use strict';

let User = require('../models/user');


/**
 * users CRUD functions
 */

// retrieve all users
let getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log('Error: ' + err);
      return res.status(401).json({
        success: false,
        message: err.message,
        error: err
      });
    }
    res.status(200).json(users);
  });
}

// create a user
let createUser = (req, res) => {
  let newObject = new User(req.body);
  newObject.save((err, newUser) => {
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
        message: 'New user was successfully created',
        user: newUser
      });
    }
  });
}

// retrieve one user
let getUser = (req, res) => {
  User.find({ _id: req.params.id }, (err, user) => {
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
}

// update the user
let updateUser = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log('Error: ' + err);
      return res.status(401).json({
        success: false,
        message: err.message,
        error: err
      });
    } else {
      user.update(
        { email: req.body.email,
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
  });
}

// delete the user
let deleteUser = (req, res) => {
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
}


module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}
