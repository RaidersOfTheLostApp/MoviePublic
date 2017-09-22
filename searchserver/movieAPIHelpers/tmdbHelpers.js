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
      console.log(e, 'trailers');
      cb(null, e.results);
    }, (e) => {
      console.log('errorintrailers');
      cb(e, null);
    });
  },

  // getSimilarMovies: (movie, cb) => {
  //   tmdb.call('/movie/' + movie + '/similar', {
  //     'language': 'en-US',
  //   }, (e) => {
  //     var movieArr = [];
  //     e.results.forEach( value => {
  //       omdbSearch(value.original_title, value.release_date, (err, res) => {
  //         if (res[0] === '<' || res[0] === 'I') {
  //           console.log('similarbroke');
  //         } else {
  //           var resp = JSON.parse(res);
  //           movieArr.push(resp);
  //           if (movieArr.length === e.results.length) {
  //             cb(null, movieArr);
  //           }
  //         }
  //       });
  //     });
  //   }, (e) => {
  //     cb(e, null);
  //   });
  //
  // },

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
