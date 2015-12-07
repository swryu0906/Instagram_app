'use strict';

let express = require('express');
let router = express.Router();
let usersCtrl = require('../controllers/usersController');

/**
 * users CRUD routes
 */

router.route('/')
  // retrieve all users
  .get(
    usersCtrl.getAllUsers
  )
  // create a new user
  .post(
    usersCtrl.createUser
  );


// log out
router.route('/logout')
  .get(
    usersCtrl.logout
  );


// log in
router.route('/login')

  .post(
    usersCtrl.login
  );


router.route('/:id')
  // retrieve a user by id
  .get(
    usersCtrl.getUser
  )
  // update the user
  .put(
    usersCtrl.updateUser
  )
  // delete the user
  .delete(
    usersCtrl.deleteUser
  );

module.exports = router;
