const express = require('express');
const middleware = require('../middleware');
const bodyParser = require('body-parser');
const fuse = require('fuse.js');
const Fuse = require('../../node_modules/fuse.js/src/index.js');
const movieone = require('../fakeData1.js');
const movietwo = require('../fakeData2.js');
const router = express.Router();
const app = express();
const tmdb = require('../movieAPIHelpers/tmdb.js');
const tmdbHelp = require('../movieAPIHelpers/tmdbHelpers.js');
const omdbHelp = require('../movieAPIHelpers/omdbHelpers.js');
const models = require('../../db/models');
const searchDb = require('../../mongodb/db.js');
// const MovieController = require('../controllers/movies.js');
const search = require('./search.js');
const async = require('async');
const RecController = require('../controllers/recs');

app.use(bodyParser.text({ type: 'text/plain' }));

const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

var today = new Date();
var future = today.addDays(90)

var todayDate = today.toJSON().split('T')[0];
var futureDate = future.toJSON().split('T')[0];

router.route('/')
  .get (middleware.auth.verify, (req, res, next) => {
    models.Profile.where({ id: req.session.passport.user }).fetch()
      .then(profile => {
        if (profile.new_user) {
          res.redirect('/setup');
        } else {
          var movies;
          searchDb.getMovies((err, data) => {
            if (err) {
              console.log('************* error from getMovies ', err);
            } else {
              movies = data;
              var sorted = sortByKey(movies, 'year');
              var recommendations;
              RecController.getRecommendations(req.session.passport.user, (err, data) => {
                if (err) {
                  console.log('********** error from getRecommendations ', err);
                } else {
                  // console.log('********** data for searchByIds ', data);
                  searchDb.searchByIds(data, (err, results) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('********** recommendations results ', results);
                      recommendations = results;
                      res.render('index.ejs', {
                        data: {
                          movieone: sorted,
                          favorites: results,
                          favoriteId: profile.attributes.favorites || [],
                          user: req.user,
                          recs: recommendations || []
                        }
                      });
                    }
                  })
                }
              });
            }
          });
        }
      });
    });

router.route('/upcoming')
  .get (middleware.auth.verify, (req, res, next) => {
    models.Profile.where({ id: req.session.passport.user }).fetch()
      .then(profile => {
        if (profile.new_user) {
          res.redirect('/setup');
        } else {
              searchDb.searchByIds(profile.attributes.favorites, (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                    tmdbHelp.getUpcomingMovies(todayDate, futureDate, (err, movies) => {
                     if (err) {
                        console.log(err, 'UPCOMINGMOVIEERROR!');
                     } else {
                          omdbHelp.searchTitleArray(movies, (err, result) => {
                          // console.log(result);
                          if (err) {
                            console.log('error with movieArray Search!');
                          }

                          else {
                            res.render('index.ejs', {
                              data: {
                              movieone: result,
                              favorites: [],
                              favoriteId: [],
                              user: req.user
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          })



router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(middleware.passport.authenticate('local-login', {
    //if new user, then go to /setup, else go to movies page
    successRedirect: '/setup',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.route('/favorites')
  .get (middleware.auth.verify, (req, res, next) => {
    var movies;
    searchDb.getMovies( (err, data) => {
      if (err) {
        console.log(err);
      } else {

        movies = data;

        var sorted = sortByKey(movies, 'year');

        models.Profile.where({ id: req.session.passport.user }).fetch()
          .then(profile => {
            if (profile.new_user) {
              res.redirect('/setup');
            } else {
              var movies;
              searchDb.getMovies((err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  movies = data;
                  var sorted = sortByKey(movies, 'year');
                  // console.log('the favorites are + ***');
                  // console.log(profile.attributes.favorites);
                  searchDb.searchByIds(profile.attributes.favorites, (err, results) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('the results length is ', results.length);
                    }
                    res.render('index.ejs', {
                      data: {
                        movieone: sorted,
                        favorites: results,
                        favoriteId: profile.attributes.favorites,
                        user: req.user
                      }
                    });
                  });
                }
              });
            }
          });
      }
    });
  });

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    var actorImages, directorImages;
    models.Profile.where({ id: req.session.passport.user }).fetch()
      .then(profile => {
        if (profile.new_user) {
          res.redirect('/setup');
        } else {
          var favorites;
          searchDb.searchByIds(profile.attributes.favorites, (err, movies) => {
            if (err) {
              console.log(err);
              throw err;
            } else {
              favorites = movies;
              //get crew objects that have id, name, and url
              async.map(profile.attributes.follow_actor, function(actor, callback) {
                models.Crew.where({ id: parseInt(actor.id) }).fetch()
                  .then(actor_record => {
                    callback(null, actor_record);
                  });
              }, function(err, actor_results) {
                if (err) { throw err; }
                actorImages = actor_results;
                async.map(profile.attributes.follow_director, function(director, callback) {
                  models.Crew.where({ id: parseInt(director.id) }).fetch()
                    .then(director_record => {
                      callback(null, director_record);
                    });
                }, function(err, director_results) {
                  if (err) { throw err; }
                  directorImages = director_results;
                  res.render('index.ejs', {
                    data: {
                      user: req.user,
                      favorites: favorites || [],
                      genreFollow: profile.attributes.follow_genre || [],
                      actorFollow: actorImages || [],
                      directorFollow: directorImages || [],
                      vod_subscriptions: profile.attributes.vod_subscriptions || []
                    }
                  });
                }); //end of async map on follow_director
              }); //end of async map on follow_actor
            }
          });
        }
      })
      .catch(err => {
        // This code indicates an outside service (the database) did not respond in time
        res.status(503).send(err);
      });
  });

router.route('/following')
  .get(middleware.auth.verify, (req, res) => {
    var genreList = [];
    var actorList = [];
    var directorList = [];
    var genreMovies = [];
    var actorMovies = [];
    var directorMovies = [];
    var profileList;
    models.Profile.where({ id: req.session.passport.user }).fetch()
      .then(profile => {
        profileList = profile;
        async.sortBy(profileList.attributes.follow_genre, function(file, callback) { callback(null, file.text); }, function(err, results) {
          if (err) { throw err; }
          genreList = results;
          async.map(genreList, function(file, callback_1) {
            // select * from movies where director @> any (array ['70', '45']::jsonb[]);
            // current profiles format for follow_director: [{"id": "45", "text": "Charles Walters"}, {"id": "70", "text": "Jordan Vogt-Roberts"}]
            models.Movies.where('genres', '@>', JSON.stringify([parseInt(file.id)])).fetchAll({columns: ['mongo_id']})
              .then(genreMovieObjs => {
                async.map(genreMovieObjs.models, function(file, callback_2) {
                  callback_2(null, JSON.parse(file.attributes.mongo_id));
                }, function(err, results) {
                  if (err) { throw err; }
                  callback_1(null, results);
                });
              });
          }, function(err, results) {
            // console.log('*********** final results of async ', [].concat.apply([], results));
            if (err) { throw err; }
            searchDb.searchByIds([].concat.apply([], results), (err, movies) => {
              if (err) {
                console.log(err);
                throw err;
              } else {
                genreMovies = movies;
                async.sortBy(profileList.attributes.follow_actor, function(file, callback) { callback(null, file.text); }, function(err, results) {
                  if (err) { throw err; }
                  actorList = results;
                  async.map(actorList, function(file, callback_1) {
                    // select * from movies where director @> any (array ['70', '45']::jsonb[]);
                    // current profiles format for follow_director: [{"id": "45", "text": "Charles Walters"}, {"id": "70", "text": "Jordan Vogt-Roberts"}]
                    models.Movies.where('actors', '@>', JSON.stringify([parseInt(file.id)])).fetchAll({columns: ['mongo_id']})
                      .then(actorMovieObjs => {
                        async.map(actorMovieObjs.models, function(file, callback_2) {
                          callback_2(null, JSON.parse(file.attributes.mongo_id));
                        }, function(err, results) {
                          if (err) { throw err; }
                          callback_1(null, results);
                        });
                      });
                  }, function(err, results) {
                    // console.log('*********** final results of async ', [].concat.apply([], results));
                    if (err) { throw err; }
                    searchDb.searchByIds([].concat.apply([], results), (err, movies) => {
                      if (err) {
                        console.log(err);
                        throw err;
                      } else {
                        actorMovies = movies;
                        async.sortBy(profileList.attributes.follow_director, function(file, callback) { callback(null, file.text); }, function(err, results) {
                          if (err) { throw err; }
                          directorList = results;
                          async.map(directorList, function(file, callback_1) {
                            models.Movies.where('director', '@>', JSON.stringify([parseInt(file.id)])).fetchAll({columns: ['mongo_id']})
                              .then(directorMovieObjs => {
                                async.map(directorMovieObjs.models, function(file, callback_2) {
                                  callback_2(null, JSON.parse(file.attributes.mongo_id));
                                }, function(err, results) {
                                  if (err) { throw err; }
                                  callback_1(null, results);
                                });
                              });
                          }, function(err, results) {
                            // console.log('*********** final results of async ', [].concat.apply([], results));
                            if (err) { throw err; }
                            searchDb.searchByIds([].concat.apply([], results), (err, movies) => {
                              if (err) {
                                console.log(err);
                                throw err;
                              } else {
                                directorMovies = movies;
                                res.render('index.ejs', {
                                  data: {
                                    user: req.user,
                                    genres: genreList || [], //TODO: use to add edits to add new genres, etc.
                                    actors: actorList || [],
                                    directors: directorList || [],
                                    genreFollow: genreMovies || [],
                                    actorFollow: actorMovies || [],
                                    directorFollow: directorMovies || [],
                                    vod_subscriptions: profileList.attributes.vod_subscriptions || []
                                  }
                                });
                              }
                            }); //end of searchByIds
                          }); //end of the director map function
                        }); // end of sortBy directors
                      }
                    }); //end of searchByIds
                  }); //end of actor map
                }); //end of sortBy actors
              }
            }); //end of searchByIds
          }); //end of the genre map function
        }); // end of sortBy genres
      }) //end of then
      .catch(err => {
        console.log('*********** /setup error ', err);
        res.status(503).send(err);
      });
  });

router.route('/setup')
  .get(middleware.auth.verify, (req, res) => {
    var genreList = [];
    var actorList = [];
    var directorList = [];
    var profileList;
    models.Profile.where({ id: req.session.passport.user }).fetch()
      .then(profile => {
        profileList = profile;
        models.Genres.fetchAll()
          .then(genres => {
            return genres.models.map(genre => {
              return genre.attributes;
            });
          })
          .then(genreArr => {
            genreList = genreArr;
            models.Crew.query(function(qb) {
              qb.where('image_url', 'LIKE', '%http%')
                .andWhere('actor', '=', true);
            }).fetchAll()
              .then(actors => {
                return actors.models.map(actor => {
                  return actor.attributes;
                });
              })
              .then(actorArr => {
                actorList = actorArr;
                models.Crew.query(function(qb) {
                  qb.where('image_url', 'LIKE', '%http%')
                    .andWhere('director', '=', true);
                }).fetchAll()
                  .then(directors => {
                    return directors.models.map(director => {
                      return director.attributes;
                    });
                  })
                  .then(directorArr => {
                    directorList = directorArr;
                    res.render('index.ejs', {
                      data: {
                        user: req.user,
                        genreFollow: profileList.attributes.follow_genre || [],
                        actorFollow: profileList.attributes.follow_actor || [],
                        directorFollow: profileList.attributes.follow_director || [],
                        phone: profileList.attributes.phone || '',
                        genres: genreList,
                        actors: actorList,
                        directors: directorList,
                        vod_subscriptions: profileList.attributes.vod_subscriptions || []
                      }
                    });
                  });
              });
          });
      })
      .catch(err => {
        console.log('*********** /setup error ', err);
        res.status(503).send(err);
      });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/setup',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/setup',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
