const models = require('../../db/models');
var tmdb = require('../movieAPIHelpers/tmdb');
var tmdbHelper = require('../movieAPIHelpers/tmdbHelpers');

module.exports.addUpcomingMovie = (movie, callback) => { //(movie, callback) => {
  console.log('the movie is', movie);
  models.Upcoming.where({ imdb_id: movie.imdbID }).fetch()
    .then(function(model) {
      if (model) {
        console.log(movie.Title, ' - Movie is Already in Database');
      } else {
        console.log('********** save upcoming movie ', movie.imdbID);
        var month = {'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9,' Nov': 10, 'Dec': 11};
        var releaseDate = new Date(movie.Released.slice(7), month[movie.Released.slice(3, 6)], movie.Released.slice(0,2));
        console.log('********** releaseDate ', releaseDate);
        new models.Upcoming({
          // id: id,
          imdb_id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          release_date: releaseDate, //check format
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
        callback(null, movie.Title);
      }
    })
    .catch((err) => {
        console.log(err, 'Movie Add - Promise Error');
        callback(err);
      });
};
