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

router.route('/removefavorites')
  .post(ProfileController.removeFavorites)
;

router.route('/follows/movies')
  .post(ProfileController.setUpFollowMovies)
  .get(ProfileController.getFollowMovies)
  // .delete(ProfileController.deleteOne)
;

router.route('/follows/genres')
  .post(ProfileController.setUpFollowGenres)
  .get(ProfileController.getFollowGenres)
  // .delete(ProfileController.deleteOne)
;

router.route('/follows/actors')
  .post(ProfileController.setUpFollowActors)
  .get(ProfileController.getFollowActors)
  // .delete(ProfileController.deleteOne)
;

router.route('/follows/directors')
  .post(ProfileController.setUpFollowDirectors)
  .get(ProfileController.getFollowDirectors)
  // .delete(ProfileController.deleteOne)
;

router.route('/follows/writers')
  .post(ProfileController.setUpFollowWriters)
  .get(ProfileController.getFollowWriters)
  // .delete(ProfileController.deleteOne)
;

module.exports = router;
