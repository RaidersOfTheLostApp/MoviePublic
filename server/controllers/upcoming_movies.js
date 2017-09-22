const models = require('../../db/models');
var tmdb = require('../movieAPIHelpers/tmdb');
var tmdbHelper = require('../movieAPIHelpers/tmdbHelpers');

module.exports.addUpcomingMovie = (movie, callback) => {

  console.log('the movie is', movie);
  if (movie) {
    // movie_array.forEach((movie) => {
    // console.log(movie, movie.genre, 'Movie Info');
    var newMovie = new Promise((resolve, reject) => {
      if (resolve) {
        resolve(movie);
      } else {
        reject(Error('It broke'));
      }
    });
    newMovie.then(movie => {
      models.Upcoming.where({ imdb_id: imdbId })
        .fetch()
        .then(function(model) {
          if (model) {
            console.log(model.attributes.title, ' - Movie is Already in Database');
          } else {
            console.log('********** save upcoming movie ', imdbId);
            new models.Movies({
              // id: id,
              imdb_id: movie.imdbID,
              title: movie.Title,
              year: movie.Year,
              releaseDate: movie.Released,
              genre: movie.Genre,
              awards: movie.Awards,
              director: movie.Director,
              actors: movie.Actors,
              box_office: movie.BoxOffice,
              production: movie.Production,
              ratings: movie.imdbRating
            }).save();
            // console.log(movie, movie.title, 'Movie Added');
            console.log(movie.title, ' - Movie Added');
          }
        });
    })
    .catch((err) => {
        console.log(err, 'Movie Add - Promise Error');
      });
      callback(null, 'DB Bookshelf: Movies Added');
  } 
  else { //End of If Statement for Movie Array
    console.log('Error - Empty Movie Array');
  }
};