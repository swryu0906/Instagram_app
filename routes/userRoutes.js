'use strict';

// This SECRET_KEY needs to be moved out before deploying
const SECRET_KEY = '12345678'
let express = require('express');
let router = express.Router();


/**
 * users CRUD routes
 */

router.route('/')
  // retrieve all users
  .get((req, res) => {
    res.send('users/ all users');
  })
  // create a new user
  .post((req, res) => {
    res.json({
      success: true,
      user: 'users/ newly created user'
    });
  });

router.route('/:id')
  // retrieve a user by id
  .get((req, res) => {
    res.send('users/' + req.params.id + ' show the user');
  })
  // update the user
  .put((req, res) => {
    res.json({
      success: true,
      user: 'users/:id newly updated user'
    });
  })
  // delete the user
  .delete((req, res) => {
    res.json({
      success: true,
      user: 'users/:id newly deleted user'
    });
  });


module.exports = router;
