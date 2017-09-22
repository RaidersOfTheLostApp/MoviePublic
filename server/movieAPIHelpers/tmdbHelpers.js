const tmdb = require('./tmdb.js');
const request = require('request');
const Promise = require('bluebird');
const omdbSearch = require('./omdbHelpers.js').searchTitle;

var MovieList = {
  getMoviesByTitle: (query, cb) => {
    tmdb.call('/search/movie', {
      'language': 'en-US',
      'query': query,
      'include_adult': false,
      'video': true,
      'page': 1,
    }, (e) => {
      cb(null, e.results);
    }, (e) => {
      cb(e, null);
    });
  },

  getCrewByName: (query, cb) => { //input is name as string
    // console.log('************* in getCrewByName ', query);
    tmdb.call('/search/person', {
      'query': query,
      'include_adult': false
    }, (e) => {
      if (e.results[0] === undefined) {
        // console.log('************** e of undefined results in getCrewByName', e);
        cb(e, null);
      } else {
        // console.log('************* result e ', e.results);
        cb(null, e.results[0].id);
      }
    }, (e) => {
      cb(e, null);
    });
  },

  getCrewImageById: (id, cb) => {
    // console.log('************* in getCrewImageById ', id);
    tmdb.call('/person/' + id + '/images', {
    }, (e) => {
      if (e === undefined) {
        console.log('********** id of undefined crewObj ', id);
      }
      // console.log('************* result e ', e);
      cb(null, e);
    }, (e) => {
      cb(e, null);
    });
  },

  getUpcomingMovies: (minDate, maxDate, cb) => {
    tmdb.call('/discover/movie', {
      'language': 'en-US',
      'region': 'US',
      'release_date.gte': minDate,
      'release_date.lte': maxDate,
      'video': true,
      'page': 1
    }, (e) => {
      cb(null, e.results);

    }, (e) => {
      cb(e, null);
    });
  },

  getTrailersById: (id, cb) => {
    tmdb.call('/movie/' + id + '/videos', {
      'language': 'en-US',
    }, (e) => {
      cb(null, e.results);
    }, (e) => {
      cb(e, null);
    });
  },

  getSimilarMovies: (movie, cb) => {
    tmdb.call('/movie/' + movie + '/similar', {
      'language': 'en-US',
    }, (e) => {
      var movieArr = [];
      e.results.forEach( value => {
        console.log(value)
        omdbSearch(value.title, value.release_date, (err, res) => {
          if (!res || res[0] === '<' || res[0] === 'I') {
            cb(err, null)
          } else {
            var resp = JSON.parse(res);
            movieArr.push(resp.imdbID);
            if (movieArr.length === e.results.length) {
              cb(null, movieArr);
            }
          }
        });
      });
    }, (e) => {
      cb(e, null);
    });

  },

  // getPopularMovies: (cb) => {
  //   tmdb.call('/movie/popular', (e) => {
  //     // console.log(e, 'EEEEEEEEEEE');
  //     cb(null, e);
  //   }, (e)=>{
  //     cb(e, null);
  //   });
  // }
};

module.exports = MovieList;
