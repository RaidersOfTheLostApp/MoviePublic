const express = require('express');
const middleware = require('../middleware');
var bodyParser = require('body-parser');
<<<<<<< HEAD
const movieone = require('../fakeData1.js');
const movietwo = require('../fakeData2.js');
=======
const movies = require('../fakeData.js');
<<<<<<< HEAD

<<<<<<< HEAD
=======
const searchDb = require('../../mongodb/db.js');
>>>>>>> added grunt http and finished searchByTitle route
>>>>>>> added grunt http and finished searchByTitle route
=======
>>>>>>> for rebase
=======
const searchDb = require('../../mongodb/db.js')
>>>>>>> rebasing
const router = express.Router();
const app = express();
const axios = require('axios');
const tmdb = require('../movieAPIHelpers/tmdb.js');
const tmdbHelp = require('../movieAPIHelpers/tmdbHelpers.js');
// const MovieList = require('./getMovies.js');
var moviedata;

app.use(bodyParser.text({ type: 'text/plain' }));

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs', {
      data: {
        movieone: movieone,
        movietwo: movietwo,
        user: req.user
      }
    });
  });

  tmdbHelp.getMoviesByTitle((data)=>{
    if(!data){
      console.log(data)
    }else{
      var storage = [];
      data.results.forEach( (value)=>{storage.push(value.title)});
      console.log(storage, "THISISDATA")
      //grab each movie title and send API request to OMDB to get movie data
      searchDb.saveMovies(data.results, (err, data) => {
        if(err){
          alert('savebroken')
        }else{
          //save full movie data to mongo by title
          console.log(data, 'datainAUTH')
        }
      })
      // console.log(data, '22222')
    }
  })
router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', {
      message: req.flash('loginMessage'),
      movies: req.body
    });
  })
  .post(middleware.passport.authenticate('local-login', {
    //if new user, then go to /setup, else go to movies page
    successRedirect: '/setup',
    failureRedirect: '/login',
    failureFlash: true
  }));
  // console.log(movies);

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

router.route('/setup')
  .get(middleware.auth.verify, (req, res) => {
    // res.render('profile.ejs', {
    //   user: req.user // get the user out of session and pass to template
    // });
    // res.redirect('/account');

    // if statement for new user, go here, else redirect to /
    res.render('index.ejs', {
      data: {
        user: req.user
      }
    });
  });


router.route('/logout')
  .get((req, res) => {
    console.log('******** logout call');
    req.logout();
    res.redirect('/');
  });

router.route('/search')

  .get((req, res) => {
    searchDb.searchByTitle('black swan', (err, res) => {
      if(err){
        console.log('searcherror')
      }
      console.log(res, 'searchsuccess')
    })
    res.status(200).end();
  })

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
