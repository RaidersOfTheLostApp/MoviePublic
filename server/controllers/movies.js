const models = require('../../db/models');

module.exports.getAllMovies = (req, res) => {
  models.Movies.fetchAll()
    .then(movies => {
      // console.log(res, 'Controllers res');
      console.log(movies, 'DB Model Movies Fetched');
      res.status(200).send(movies);
    })
    .error(err => {
      console.log('Server Controller Movies - Error Caught');
      // res.status(503).send(err);
    });
};

module.exports.addMovies = (movie_array, callback) => {
  // console.log(movie_array, 'Movie Array passed from Server Auth');
  // if (err) {
  //   callback(err, null);
  // } else {
  movie_array.forEach((movie) => {
    // console.log(movie.item, movie.item.ratings, 'Movie Info');
    new models.Movies({
      // id: id,
      // mongo_id: movie.item._id,
      title: movie.item.title,
      year: movie.item.year,
      release_date: JSON.stringify(movie.item.release_date),
      genre: JSON.stringify(movie.item.genre),
      awards: JSON.stringify(movie.item.awards),
      director: JSON.stringify(movie.item.directors),
      writer: JSON.stringify(movie.item.writers),
      actors: JSON.stringify(movie.item.actors),
      // box_office: movie.box_Office,
      production: movie.item.production,
      ratings: JSON.stringify(movie.item.ratings),
    }).save();
  });

  // console.log('DB Bookshelf: Movies Added');
  callback(null, 'DB Bookshelf: Movies Added');
  // }
};

module.exports.updateMovieInfo = (newInfo, callback) => {
  console.log(newInfo, callback, 'updateMovieInfo');
};
