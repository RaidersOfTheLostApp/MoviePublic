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
const models = require('../../db/models');
const searchDb = require('../../mongodb/db.js');
const MovieController = require('../controllers/movies.js');
const search = require('./search.js');
var Promise = require('bluebird');
var join = Promise.join;

app.use(bodyParser.text({ type: 'text/plain' }));

const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};

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
              console.log(err);
            } else {
              movies = data;
              var sorted = sortByKey(movies, 'year');
              searchDb.searchByIds(profile.attributes.favorites, (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  //console.log('the results length is ', results.length);
                  res.render('index.ejs', {
                    data: {
                      movieone: sorted,
                      favorites: results,
                      favoriteId: profile.attributes.favorites || [],
                      user: req.user
                    }
                  });
                }
              });
            }
          });
        }
      });
  });


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
  });

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    models.Profile.where({ id: req.session.passport.user }).fetch()
      .then(profile => {
        if (profile.new_user) {
          res.redirect('/setup');
        } else {
          res.render('index.ejs', {
            data: {
              user: req.user,
              genreFollow: profile.attributes.follow_genre || [],
              actorFollow: profile.attributes.follow_actor || [],
              directorFollow: profile.attributes.follow_director || [],
              writerFollow: profile.attributes.follow_writers || [],
              vod_subscriptions: profile.attributes.vod_subscriptions || []
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
    models.Profile.where({ id: req.session.passport.user }).fetch()
      .then(profile => {
        //TODO: get list of mongo movies here or on the client side?
        res.render('index.ejs', {
          data: {
            user: req.user,
            genreFollow: profile.attributes.follow_genre || [],
            actorFollow: profile.attributes.follow_actor || [],
            directorFollow: profile.attributes.follow_director || [],
            writerFollow: profile.attributes.follow_writers || [],
            vod_subscriptions: profile.attributes.vod_subscriptions || []
          }
        });
      })
      .catch(err => {
        res.status(503).send(err);
      });
  });

router.route('/setup')
  .get(middleware.auth.verify, (req, res) => {
    var genreList = getGenres();
    var actorList = getActors();
    var directorList = getDirectors();
    Promise.join(genreList, actorList, directorList, (genreList, actorList, directorList) => {
      console.log('******** genreList ', genreList);
      console.log('******** actorList ', actorList);
      console.log('******** directorList ', directorList);
      res.render('index.ejs', {
        data: {
          user: req.user,
          genres: genreList,
          actors: actorList,
          directors: directorList
        }
      });
    })
    .catch(err => {
      console.log('*********** /setup error ', err);
      res.status(503).send(err);
    });
  });

var getGenres = function() {
  models.Genres.fetchAll()
  .then(genres => {
    var genreList = [];
    genres.models.forEach(genre => {
      genreList.push(genre.attributes);
    })
    return genreList;
  });
}

var getActors = function() {
  models.Crew.where({actor: true}).fetchAll()
  .then(actors => {
    var actorList = [];
    actors.models.forEach(actor => {
      actorList.push(actor.attributes);
    })
    return actorList;
  });
}

var getDirectors = function() {
  models.Crew.where({director: true}).fetchAll()
  .then(directors => {
    var directorList = [];
    directors.models.forEach(director => {
      directorList.push(director.attributes);
    })
    return directorList;
  });
}

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

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../react-client/dist/index.html'));
// });

// router.get('/auth/twitter', middleware.passport.authenticate('twitter'));
//
// router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
//   successRedirect: '/profile',
//   failureRedirect: '/login'
// }));

module.exports = router;

// app.use(express.static(__dirname + '/../react-client/dist'));

// var chosencategory;
// var dbvalues = [];

// var dbdata = function(data) {
//   for (var i = 0; i < data.length; i++) {
//     dbvalues.push(data[i].playlistname + ': ' + data[i].playlisturl);
//   }
//   console.log('the sql values are' + dbvalues);
// }

// var modifieddata = function(data) {
//   for (var i = 0; i < data.length; i++) {
//     if (data[i].push(chosencategory));
//   }

//   for (var m = 0; m < data.length; m++) {
//       var playlist = data[m];
//       mysql.insertValues(playlist);
//     }
// }

// // app.post('/items', function (req, res) {
// //   console.log('we received the POST request on the server!');
// //   var category = req.body;
// //   chosencategory = category;
// //   console.log(chosencategory);
// //   var newreq = apiHelpers.categoryRouter(category, apiHelpers.listFormatter);
// // });

// // app.get('/items', function (req, res) {
// //   console.log('we received the GET request on the server!')
// //   var category = req.query.value;
// //   mysql.grabValues(category, function(err, data) {
// //     if (err) {
// //       console.log(err);
// //     }
// //     else {
// //       console.log('this worked!');
// //       dbdata(data);
// //       res.send(dbvalues);
// //     }
// //   });
// // })
