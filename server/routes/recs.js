'use strict';
const express = require('express');
const router = express.Router();
const RecController = require('../controllers/recs.js');

router.route('/:id')
  .get(RecController.getRecommendations);

module.exports = router;
