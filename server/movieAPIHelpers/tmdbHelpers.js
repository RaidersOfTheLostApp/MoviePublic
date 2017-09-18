const tmdb = require('./tmdb.js');
const request = require('request');
const Promise = require('bluebird');

var MovieList = {
  getMoviesByTitle: (query, cb) => {
    tmdb.call('/search/movie', {
      'language': 'en-US',
      'query': query,
      'include_adult': false,
      'video': true,
      'page': 1
    }, (e) => {
      cb(null, e.results);
    }, (e) => {
      cb(e, null);
    });
  },

  getCrewByName: (query, cb) => { //input is name as string
    tmdb.call('/search/person', {
      'query': query,
      'include_adult': false
    }, (e) => {
      console.log('********* getCrewByName ', e.results);
      cb(null, e.results[0].id);
    }, (e) => {
      cb(e, null);
    });
  },

  getCrewImageById: (id, cb) => {
    tmdb.call('/person' + id + '/images', {
    }, (e) => {
      console.log('******** getCrewImageById ', e.results);
      cb(null, e.results.profiles[0].file_path);
    }, (e) => {
      cb(e, null);
    });
  },

  getTrailersById: (id, cb) => {
    tmdb.call('/movie/' + id + '/videos', {
      'language': 'en-US',
    }, (e) => {
      // console.log(e.results, 'asdfsdfsf');
      cb(null, e.results);
    }, (e) => {
      cb(e, null);
    });
  },

  getSimilarMovies: (movie, cb) => {
    // console.log(movie, 'getSimilarMovies Helper');
    if (!movie) {
      // console.log('Similar Movie: no Movie');
      cb(null, null);
    } else {
      tmdb.call('/movie/' + movie + '/similar', {
        'language': 'en-US',
      }, (e) => {
        console.log(e.results, 'asdfsdfsf');
        cb(null, e.results);
      }, (err) => {
        console.log(err, 'BROKE IN TMDBHELP');
        cb(err, null);
      });
    }
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
