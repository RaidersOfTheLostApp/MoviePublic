'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/')
  .get(ProfileController.getAll)
  // .post(ProfileController.create)
;

router.route('/:id')
  .get(ProfileController.getOne)
  .put(ProfileController.update)
  // .delete(ProfileController.deleteOne)
;

router.route('/newUser')
  .post(ProfileController.newUser)
  // .delete(ProfileController.deleteOne)
;

router.route('/vod')
  .post(ProfileController.setUpVOD)
  // .delete(ProfileController.deleteOne)
;

router.route('/addfavorites')
  .post(ProfileController.addFavorites)
;

router.route('/getfavorites')
  .get(ProfileController.getFavorites)
;

router.route('/follows/movies')
  .post(ProfileController.setUpFollowMovies)
  // .delete(ProfileController.deleteOne)
;

router.route('/follows/genres')
  .post(ProfileController.setUpFollowGenres)
  // .delete(ProfileController.deleteOne)
;

router.route('/follows/actors')
  .post(ProfileController.setUpFollowActors)
  // .delete(ProfileController.deleteOne)
;

router.route('/follows/directors')
  .post(ProfileController.setUpFollowDirectors)
  // .delete(ProfileController.deleteOne)
;

router.route('/follows/writers')
  .post(ProfileController.setUpFollowWriters)
  // .delete(ProfileController.deleteOne)
;

module.exports = router;
