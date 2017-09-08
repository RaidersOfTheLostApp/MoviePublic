const express = require('express');
const middleware = require('../middleware');
const bodyParser = require('body-parser');
const fuse = require('fuse.js');
const Fuse = require('../../node_modules/fuse.js/src/index.js')
const movieone = require('../fakeData1.js');
const movietwo = require('../fakeData2.js');
const searchDb = require('../../mongodb/db.js');
const tmdbHelp = require('../movieAPIHelpers/tmdbHelpers.js');
const router = express.Router();
const app = express();

app.use(bodyParser.text({ type: 'text/plain' }));

const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
}

router.route('/search')
  .get((req, res, next) => {
    var outputarr = [];
    // console.log(req)
    searchDb.getMovies( {}, (err, res1) => {
      if (err) {
        alert('search broken try again');
      } else {
        // console.log(res, '@@@@')
        if (res1.length < 100) {
          tmdbHelp.getMoviesByTitle(req.query.value, (err, data)=> {
            if (err) {
              console.log(err, 'ERRORGETMOVIESERROR');
            } else {
              console.log(data, '@@@@@@@')
              //grab each movie title and send API request to OMDB to get movie data
              searchDb.saveMovies(data, () => {

                  // console.log(req,' @@@')
                searchDb.getMovies( {}, (err, res2) => {
                  // console.log(err, res2, 'erres')
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
                      "title",
                      "actors",
                      "director",
                      "genre",
                      "year",

                    ]
                  };
                  var fuse = new Fuse(res2, options); // "list" is the item array
                  var result = fuse.search(req.query.value);
                  var sorted = sortByKey(result, 'year');
                  outputarr = sorted;
                  // res.redirect('/');
                  res.send(outputarr);
                  console.log('sorted')
                  // res.send(200);
                })

              });
              // console.log(data, '22222')
            }
          });
        }else{
          res.send(res1);
        }
      }
    });

  });
