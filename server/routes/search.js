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
const MovieController = require('../controllers/movies.js');
const search = require('./search.js');

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
            console.log(err, 'ERRORGETMOVIESERROR');
          } else {
            //grab each movie title and send API request to OMDB to get movie data
            searchDb.saveMovies(data, () => {
              searchDb.getMovies({}, (err, res2) => {
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
                    res.json(movieArr);
                  }
                }
                MovieController.addMovies(res2, (err, results) => {
                  if (err) {
                    console.log(err, 'Server Response - PG Unable to Add Movies');
                    // res.status(500).send('Postgres: Error adding movies');
                  } else {
                    console.log(results, 'Server Response - PG Added Data');
                    // res.status(201).send('Server Response - PG Added Data');
                  }
                });

              });

            });

          }
        });

      }
    });

  });

router.route('/id')
  .get(middleware.auth.verify, (req, res, next) => {
    console.log(req, '@@@@@@2');
    searchDb.searchByIds(req.body, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.json(data);
      }
    });
  });

module.exports = router;
