const models = require('../../db/models');
var tmdb = require('../movieAPIHelpers/tmdb');
var tmdbHelper = require('../movieAPIHelpers/tmdbHelpers');

module.exports.addUpcomingMovie = (movie) => { //(movie, callback) => {
  console.log('the movie is', movie);
  models.Upcoming.where({ imdb_id: movie.imdbID }).fetch()
    .then(function(model) {
      if (model) {
        console.log(movie.Title, ' - Movie is Already in Database');
      } else {
        console.log('********** save upcoming movie ', movie.imdbID);
        new models.Upcoming({
          // id: id,
          imdb_id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          release_date: movie.Released, //check format
          genres: JSON.stringify(movie.Genre.split(', ')), //send to queue
          awards: JSON.stringify([movie.Awards]),
          director: JSON.stringify(movie.Director.split(', ')),
          actors: JSON.stringify(movie.Actors.split(', ')),
          box_office: movie.BoxOffice,
          production: movie.Production,
          ratings: JSON.stringify([movie.imdbRating]),
          poster: movie.Poster
        }).save();
        // console.log(movie, movie.title, 'Movie Added');
        console.log(movie.Title, ' - Movie Added');
      }
    })
    .catch((err) => {
        console.log(err, 'Movie Add - Promise Error');
      });
};
