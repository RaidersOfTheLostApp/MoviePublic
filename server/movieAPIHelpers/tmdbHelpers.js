const tmdb = require('./tmdb.js');
const request = require('request');

console.log(tmdb);
var MovieList = {
  getMoviesByTitle: (cb) => {
    tmdb.call('/discover/movie', {
      'query': 'indiana jones'
    }, cb);
  }
};

module.exports = MovieList;
