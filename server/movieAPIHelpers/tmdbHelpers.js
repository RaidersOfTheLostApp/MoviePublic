const tmdb = require('./tmdb.js');
const request = require('request');

var MovieList = {
  getMoviesByTitle: (query, cb) => {
    tmdb.call('/search/movie', {
      'language': 'en-US',
      'query': query,
      'video': true,
      'page': 1
    }, (e) => {
      cb(null, e.results);

    }, (e)=>{
      cb(e, null);
    });
  },

  getTrailersById: (id, cb) => {
    tmdb.call('/movie/' + id + '/videos', {
      'language': 'en-US',
    }, (e) => {
      // console.log(e.results, 'asdfsdfsf');
      cb(null, e.results);

    }, (e)=>{
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
