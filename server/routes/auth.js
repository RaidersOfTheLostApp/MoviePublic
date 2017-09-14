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

app.use(bodyParser.text({ type: 'text/plain' }));

const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};

router.route('/')
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
                  res.render('index.ejs', {
                    data: {
                      movieone: sorted,
                      favorites: profile.favorites,
                      user: req.user
                    }
                    // data: movies // from fakeData file
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
  .get(middleware.auth.verify, (req, res) => {
    // res.render('profile.ejs', {
    //   user: req.user // get the user out of session and pass to template
    // });
    // res.redirect('/account');
    res.render('index.ejs', {
      data: {
        user: req.user
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
          //TODO: add mongoId search to return arrays
          var followMovies;
          console.log('********** start searchbyids with ', profile.attributes.follow_movies);
          searchDb.searchByIds(profile.attributes.follow_movies, (err, movies) => {
            if (err) {
              console.log(err);
            } else {
              followMovies = movies;
              console.log('************** followMovies ', followMovies);
              res.render('index.ejs', {
                data: {
                  user: req.user,
                  favorites: profile.attributes.favorites || [],
                  movieFollow: followMovies || [],
                  genreFollow: profile.attributes.follow_genre || [],
                  actorFollow: profile.attributes.follow_actor || [],
                  directorFollow: profile.attributes.follow_director || [],
                  writerFollow: profile.attributes.follow_writers || [],
                  vod_subscriptions: profile.attributes.vod_subscriptions || []
                }
              });
            }
          })
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
            movieFollow: profile.attributes.follow_movies || [],
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
    //TODO: also get movies, writers, directors, and screenwriters to pass down
    models.Genres.fetchAll()
      .then(genreList => {
        var finalGenres = [];
        for (var i = 0; i < genreList.models.length; i++) {
          finalGenres.push(genreList.models[i].attributes);
        }
        res.render('index.ejs', {
          data: {
            user: req.user,
            genres: finalGenres
          }
        });
      })
      .catch(err => {
        console.log('*********** error ', err);
        res.status(503).send(err);
      });
  });

router.route('/logout')
  .get((req, res) => {
    console.log('******** logout call');
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
