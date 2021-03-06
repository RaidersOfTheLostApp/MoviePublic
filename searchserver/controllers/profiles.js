const models = require('../../db/models');
const searchDb = require('../../mongodb/db');

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getFollowGenres = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      //TODO get movies for each genre and then concat uniques and return
      var searchGenres = [];
      //for (var i = 0; i < profile.attributes.follow_genre.length; i++) {
      searchGenres.push(profile.attributes.follow_genre[0].text);
      // }
      models.Movies.where('genres', '@>', JSON.stringify(searchGenres)).fetchAll()
        .then(moviesArr => {
          var searchMovieIds = [];
          for (var i = 0; i < moviesArr.models.length; i++) {
            searchMovieIds.push(JSON.parse(moviesArr.models[i].attributes.mongo_id));
          }
          searchDb.searchByIds(searchMovieIds, (err, mongoMovieArr) => {
            // console.log('************* genre movies search movie ids', mongoMovieArr);

            if (err) { throw err; }
            res.status(200).send(mongoMovieArr);
          });
        });
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getFollowActors = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      //TODO call mongo and pass in array, see getFollowGenres
      res.status(200).send(moviesArr);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getFollowDirectors = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      //TODO call mongo and pass in array, see getFollowGenres
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then((result) => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* in catch ', e);
      res.sendStatus(404);
    });
};

module.exports.newUser = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.save({new_user: false}, {patch: true});
    })
    .then((profile) => {
      res.sendStatus(201);
    })
    .error(err => {
      console.log('********* error in newUser ', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in newUser ', e);
      res.sendStatus(404);
    });
};

module.exports.setUpVOD = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      var subs = [];
      for (var key in req.body) {
        if (req.body[key]) {
          subs.push(req.body[key]);
        }
      }
      return profile.save({vod_subscriptions: JSON.stringify(subs)}, {patch: true});
    })
    .then((profile) => {
      res.sendStatus(201);
    })
    .error(err => {
      console.log('********* error in setUpVOD ', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in setUpVOD ', e);
      res.sendStatus(404);
    });
};

module.exports.setUpFollowGenres = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      var genreSet = [];
      var genreText;
      var save = false;
      for (var key in req.body) {
        if (save) {
          genreSet.push({'text': genreText, 'id': req.body[key]});
          save = !save;
        } else {
          genreText = req.body[key];
          save = !save;
        }
      }
      return profile.save({follow_genre: JSON.stringify(genreSet)}, {patch: true});
    })
    .then((result) => {
      res.sendStatus(201);
    })
    .error(err => {
      console.log('********* error in setUpFollowGenres ', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in setUpFollowGenres ', e);
      res.sendStatus(404);
    });
};

module.exports.setUpFollowActors = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      var actorSet = [];
      var actorText;
      var save = false;
      for (var key in req.body) {
        if (save) {
          actorSet.push({'text': actorText, 'id': req.body[key]});
          save = !save;
        } else {
          actorText = req.body[key];
          save = !save;
        }
      }
      return profile.save({follow_actor: JSON.stringify(actorSet)}, {patch: true});
    })
    .then((result) => {
      res.sendStatus(201);
    })
    .error(err => {
      console.log('********* error in setUpFollowActors ', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in setUpFollowActors ', e);
      res.sendStatus(404);
    });
};

module.exports.setUpFollowDirectors = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      var directorSet = [];
      var directorText;
      var save = false;
      for (var key in req.body) {
        if (save) {
          directorSet.push({'text': directorText, 'id': req.body[key]});
          save = !save;
        } else {
          directorText = req.body[key];
          save = !save;
        }
      }
      return profile.save({follow_director: JSON.stringify(directorSet)}, {patch: true});
    })
    .then((result) => {
      res.sendStatus(201);
    })
    .error(err => {
      console.log('********* error in setUpFollowDirectors ', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in setUpFollowDirectors ', e);
      res.sendStatus(404);
    });
};

module.exports.addFavorites = (req, res) => {
  var movieId = Object.keys(req.body);
  var newArray = [];
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      console.log('we are going to add favorites!');
      if (!profile) {
        throw profile;
      }
      return profile;
    })
    .then((profile) => {
      var favorites = profile.attributes.favorites;
      console.log(favorites);
      if (favorites === null) {
        newArray = newArray.concat(movieId);
      } else {
        for (var i = 0; i < favorites.length; i++) {
          newArray.push(favorites[i]);
        }
        newArray = newArray.concat(movieId);
      }
      return profile.save({favorites: JSON.stringify(newArray)}, {patch: true});
    })
    .then((profile) => {
      console.log('********* favorites have successfully been saved to DB for user ' + profile.attributes.display);
      res.status(201).send(profile.attributes.display);
    })
    .error(err => {
      console.log('********* error in saving favorites to DB', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in setFavorites', e);
      res.sendStatus(404);
    });
};

module.exports.removeFavorites = (req, res) => {
  var movieId = Object.keys(req.body).toString();
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      console.log('we are going to remove favorites!');
      if (!profile) {
        throw profile;
      }
      return profile;
    })
    .then((profile) => {
      var favorites = profile.attributes.favorites;
      console.log(favorites);
      for (var i = 0; i < favorites.length; i++) {
        console.log(favorites[i] === movieId);
        if (favorites[i] === movieId) {
          favorites.splice(i, 1);
        }
      }
      return profile.save({favorites: JSON.stringify(favorites)}, {patch: true});
    })
    .then((profile) => {
      console.log('********* favorites have been successfully removed for ' + profile.attributes.display);
      res.status(201).send(profile);
    })
    .error(err => {
      console.log('********* error in removing favorites from DB', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in removeFavorites', e);
      res.sendStatus(404);
    });
};

module.exports.getFavorites = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile;
    })
    .then((profile) => {
      console.log('********* favorites have successfully been grabbed from the database');
      console.log(profile.attributes.favorites);
      res.status(201).send(profile.attributes.favorites || []);
    })
    .error(err => {
      console.log('********* error in getting favorites from database', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in getFavorites', e);
      res.sendStatus(404);
    });
};
