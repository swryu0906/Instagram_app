'use strict';

let express = require('express');
let router = express.Router();
let searchesCtrl = require('../controllers/yelpController');


/**
 * search API routes
 */

// retrieve Yelp search results
router.route('/search')
  .get(
    searchesCtrl.yelp
  );

module.exports = router;
