'use strict';
const express = require('express');
const middleware = require('../middleware');
const bodyParser = require('body-parser');
const fuse = require('fuse.js');
const Fuse = require('../../node_modules/fuse.js/src/index.js');
const router = express.Router();
const app = express();
const tmdb = require('../movieAPIHelpers/tmdb.js');
const tmdbHelp = require('../movieAPIHelpers/tmdbHelpers.js');
const models = require('../../db/models');
const searchDb = require('../../mongodb/db.js');
const search = require('./search.js');
const gracenote = require('../movieAPIHelpers/gracenote.js');

const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};

router.route('/')
  .get(middleware.auth.verify, (req, res, next) => {

    module.exports.sortByKey = (array, key) => {
      return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      });
    };

    var outputarr = [];

    searchDb.getMovies({}, (err, res1) => {

      if (err) {
        alert('search broken try again');
      } else {

        tmdbHelp.getMoviesByTitle(req.query.value, (err, data) => {
          if (err) {
            console.log('TMBD Search Error');
          } else {
            //grab each movie title and send API request to OMDB to get movie data
            searchDb.saveMovies(data, () => {
              searchDb.getMovies({}, (err, res2) => {
                if (err) {
                  console.log('borken in 2nd part of savemovies db');
                } else {
                  var options = {
                    shouldSort: true,
                    tokenize: true,
                    findAllMatches: true,
                    includeScore: true,
                    includeMatches: true,
                    threshold: 0.6,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 3,
                    keys: [
                      'title',
                      'actors',
                      'director',
                      'genre',
                      'year',
                    ]
                  };
                  var fuse = new Fuse(res2, options); // "list" is the item array
                  var result = fuse.search(req.query.value);
                  var sorted = sortByKey(result, 'score');
                  // console.log('*************** sorted[0] ', sorted[0]);
                  // console.log('************** sorted', sorted);
                  // console.log(res2, 'Post Sorted - Res2');
                  // MovieController.getAllMovies();
                  var movieArr = [];
                  for (var i = 0; i < sorted.length; i++) {
                    movieArr.push(sorted[i].item);
                    if (i === sorted.length - 1) {
                      res.send(movieArr);
                    }
                  }

                }
              });

            });

          }
        });

      }
    });
  });

router.route('/id')
  .get(middleware.auth.verify, (req, res, next) => {
    // console.log(req, '@@@@@@2');
    searchDb.searchByIds(req.body, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.json(data);
      }
    });
  });

router.route('/newmovies')
.get(middleware.auth.verify, (req, res, next) => {
  var minArray = req.query.minDate.split(' ');
  var maxArray = req.query.maxDate.split(' ');
  var monthArray = {
  'Jan': '01',
  'Feb': '02',
  'Mar': '03',
  'Apr': '04',
  'May': '05',
  'Jun': '06',
  'Jul': '07',
  'Aug': '08',
  'Sep': '09',
  'Oct': '10',
  'Nov': '11',
  'Dec': '12'
  }
  var newMinDate = minArray[3] + '-' + monthArray[minArray[1]] + '-' + minArray[2];
  var newMaxDate = maxArray[3] + '-' + monthArray[maxArray[1]] + '-' + maxArray[2]; 

  searchDb.getMovies({}, (err, res1) => {
      if (err) {
        alert('search broken try again');
      } else {
          tmdbHelp.getUpcomingMovies(newMinDate, newMaxDate, (err, data) => {
           if (err) {
              console.log(err, 'UPCOMINGMOVIEERROR!');
            } else {
              res.send(data);
              };
          });
        };
    })
  })

router.route('/gettheaters')
.get(middleware.auth.verify, (req, res, next) => {
  var playingArray = req.query.startDate.split(' ');
  var monthArray = {
  'Jan': '01',
  'Feb': '02',
  'Mar': '03',
  'Apr': '04',
  'May': '05',
  'Jun': '06',
  'Jul': '07',
  'Aug': '08',
  'Sep': '09',
  'Oct': '10',
  'Nov': '11',
  'Dec': '12'
  }

  var newPlayingData = playingArray[3] + '-' + monthArray[playingArray[1]] + '-' + playingArray[2];

  var params = {
    startDate: newPlayingData, 
    numDays: req.query.numDays,
    zip: req.query.zip,
    radius: req.query.radius
  }

  gracenote.call(params, (data) => {
      res.send(data);  
    }, (data) => {
      res.send(null);
  });
})
            
module.exports = router;
