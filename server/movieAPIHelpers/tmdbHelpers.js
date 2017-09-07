const tmdb = require('./tmdb.js');
const request = require('request');

var MovieList = {
  getMoviesByTitle: (query, cb) => {
    console.log(query, 'TMDB');
    tmdb.call('/discover/movie', {
      'query': JSON.stringify(query),
    }, (e) => {
      console.log(e, 'EEEEEEEEEEE');
      cb(null, e);
    }, (e)=>{
      cb(e, null);
    });
  }
};

module.exports = MovieList;
