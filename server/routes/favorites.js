'use strict';
const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers').Favorites;

router.route('/savefavorites')
  .post(FavoriteController.saveFavorites)
;

module.exports = router;