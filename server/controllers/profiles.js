const models = require('../../db/models');

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
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save({new_user: false}, {patch: true});
    })
    .then(() => {
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
    .then(() => {
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

module.exports.setUpFollowMovies = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      //format of values: { 'movieFollow[0][text]': 'Raiders of the Lost Ark', 'movieFollow[0][id]': '1', 'movieFollow[1][text]': 'Temple of Doom', 'movieFollow[1][id]': '2' }
      //indexes match Postgres table indexes for the movies table
      var movieSet = [];
      var movieText;
      var save = false;
      for (var key in req.body) {
        if (save) {
          movieSet.push({'text': movieText, 'id': req.body[key]});
          save = !save;
        } else {
          movieText = req.body[key];
          save = !save;
        }
      }
      return profile.save({follow_movies: JSON.stringify(movieSet)}, {patch: true});
    })
    .then((result) => {
      res.sendStatus(201);
    })
    .error(err => {
      console.log('********* error in setUpFollowMovies ', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in setUpFollowMovies ', e);
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

module.exports.setUpFollowWriters = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      var writerSet = [];
      var writerText;
      var save = false;
      for (var key in req.body) {
        if (save) {
          writerSet.push({'text': writerText, 'id': req.body[key]});
          save = !save;
        } else {
          writerText = req.body[key];
          save = !save;
        }
      }
      return profile.save({follow_writers: JSON.stringify(writerSet)}, {patch: true});
    })
    .then((result) => {
      res.sendStatus(201);
    })
    .error(err => {
      console.log('********* error in setUpFollowWriters ', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in setUpFollowWriters ', e);
      res.sendStatus(404);
    });
};

// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.session.passport.user }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
