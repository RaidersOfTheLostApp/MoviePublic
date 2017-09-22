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
const omdbHelper = require('../movieAPIHelpers/omdbHelpers.js');
const async = require('async');
 
const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};

router.route('/')
  .get((req, res, next) => {
    module.exports.sortByKey = (array, key) => {
      return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      });
    };

    var outputarr = [];
    //grab all movies from db
    searchDb.getMovies({}, (err, res1) => {
      var saveArray = [];
      if (err) {
        alert('search broken try again');
      } else {

        //if the search value is empty send every movie in the responseevery movie
        if (req.query.value.length === 0) {
          res.send(res1);
        } else {

          //sort through searched movies and then send the results in the response
          var options = {
            shouldSort: true,
            tokenize: false,
            includeScore: true,
            includeMatches: true,
            threshold: 0.4,
            location: 0,
            distance: 100,
            maxPatternLength: 50,
            minMatchCharLength: 5,
            keys: [
              'title',
              'actors',
              'director',
              'genre',
              'year',
            ]
          };
          var fuse = new Fuse(res1, options); // "list" is the item array
          var result = fuse.search(req.query.value);
          var sorted = sortByKey(result, 'score');
          res.send(sorted);
        }
      }

      //send API calls and populate id table/increment counts for future searches to reference
      tmdbHelp.getMoviesByTitle(req.query.value, (err, movie) => {
        if (err) {
          console.log('TMBD Search Error');
        } else {
          if (!movie) {
            return;
          }
          // console.log(movie, '@@@');
          searchDb.getidlist( (err, ids) => {
            if (err) {
              console.log(err, 'getidsbroken');
            }
            // console.log(ids, ')(())')

            //if the id table is empty, insert all movies
            if (ids.length === 0) {
              movie.forEach(value => {
                saveArray.push({
                  id: value.id,
                  title: value.title,
                  release_date: value.release_date,
                  count: 1
                });
              });
              console.log(saveArray);
              if (saveArray.length === movie.length) {
                searchDb.saveToId(saveArray, (err, res) => {
                  if (err) {
                    console.log('error');
                  } else {
                    // console.log(res)
                  }
                });
              }
            } else {
              //otherwise, grab every movie and create an object with id and count to store in a queue
              //the code should update counts for stored ids and create new objects for new ids
              for (var j = 0; j < movie.length; j++) {
                for (var i = 0; i < ids.length; i++) {
                  console.log(movie[j].id, ids[i].id);
                  if (movie[j].id === ids[i].id) {
                    console.log('here');
                    saveArray.push({
                      id: movie[j].id,
                      title: movie[j].title,
                      release_date: movie[j].release_date,
                      stored: ids[i].stored
                    });
                    break;
                  }
                }
                if (i === ids.length) {
                  console.log('madeend');
                  saveArray.push({
                    id: movie[j].id,
                    title: movie[j].title,
                    release_date: movie[j].release_date,
                  });
                  // console.log(saveArray, j , '%%%')
                }
                // console.log(saveArray, '((((((()))))))');

                //if id table is empty, add all objects and use the mongoose .save function
                //.save will update counts if the object is replicateng inputs
                //it will insert a new object if there is no base one

              }
            }
            searchDb.saveToId(saveArray, (err, res) => {
              if (err) {
                // console.log('error')
              } else {
                // console.log('working')
              }
            });
          });
        }
      });
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

module.exports = router;
