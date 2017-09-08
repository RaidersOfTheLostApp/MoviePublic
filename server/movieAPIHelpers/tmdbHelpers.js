const tmdb = require('./tmdb.js');
const request = require('request');

var MovieList = {
  getMoviesByTitle: (query, cb) => {
    console.log(query, 'TMDB');
    tmdb.call('/search/movie', {
      'language': 'en-US',
      'query': query,
      'page': 1
    }, (e) => {
      // console.log(e, 'EEEEEEEEEEE');
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
