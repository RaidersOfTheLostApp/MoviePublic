'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/')
  .get(ProfileController.getAll)
  // .post(ProfileController.create)
  .post(ProfileController.update, (req, res) => {
    // console.log('*********** after route / params in api/profiles ', req.session.passport.user);
  });

router.route('/:id')
  .put(ProfileController.update, (req, res) => {
    // console.log('*********** after route/:id params in api/profiles ', req.session.passport.user);
  })
  // .delete(ProfileController.deleteOne)
;


module.exports = router;
