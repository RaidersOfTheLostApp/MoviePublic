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

// router.route('/vod')
//   .post(ProfileController.setUpVOD)
//   // .delete(ProfileController.deleteOne)
// ;

router.route('/phone')
  .post(ProfileController.updatePhone)
  // .delete(ProfileController.deleteOne)
;

router.route('/addfavorites')
  .post(ProfileController.addFavorites)
;

router.route('/removefavorites')
  .post(ProfileController.removeFavorites)
;

router.route('/addIMDbFollow')
  .post(ProfileController.addIMDbFollow)
;

router.route('/removefollowingIMDB')
  .post(ProfileController.removeFollowing)
;

router.route('/removefollowingGenre')
  .post(ProfileController.removeFollowGenres)
;

router.route('/removefollowingActor')
  .post(ProfileController.removeFollowActors)
;

router.route('/removefollowingDirector')
  .post(ProfileController.removeFollowDirectors)
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

module.exports = router;
