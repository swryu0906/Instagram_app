'use strict';

let express = require('express');
let router = express.Router();
let userCtrl = require('../controllers/usersController');

/**
 * users CRUD routes
 */

router.route('/')
  // retrieve all users
  .get(
    userCtrl.getAllUsers
  )
  // create a new user
  .post(
    userCtrl.createUser
  );

// login
router.post('/login', (req, res) => {
      console.log(req.body);
      res.json(req.body);
    }
  );

router.route('/:id')
  // retrieve a user by id
  .get(
    userCtrl.getUser
  )
  // update the user
  .put(
    userCtrl.updateUser
  )
  // delete the user
  .delete(
    userCtrl.deleteUser
  );

module.exports = router;
