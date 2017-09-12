const models = require('../../db/models');

module.exports.getAllMovies = (req, res) => {
  models.Movies.fetchAll()
    .then(movies => {
      // console.log(res, 'Controllers res');
      console.log(movies, 'DB Model Movies Fetched');
      // res.status(200).send(movies);
    })
    .error(err => {
      console.log('Server Controller Movies - Error Caught');
      // res.status(503).send(err);
    });
};

module.exports.addMovies = (movie_array, callback) => {
  // console.log(movie_array, 'Movie Array passed from Server Auth');
  movie_array.forEach((movie) => {
    // console.log(movie.item, movie.item.genre, 'Movie Info');

    let genre_id = null;
    let actor_id = null;
    let director_id = null;
    let writer_id = null;
    let genre = movie.item.genre[0].split(', ');
    // console.log(genre, 'Genres: Array');
    genre.forEach((genre) => {
      // console.log(genre, 'Solo Genre');
      new models.Genres({ 'name': genre })
        .fetch()
        .then(function(model) {
          console.log(model, 'model');
          // Issue: the fetch query isn't working
          if (model) {
            console.log(model, 'Genre is Already in Database');
            // console.log(model.get('title'));
          } else {
            new models.Genres({
              name: genre
            }).save();
            console.log('Genre Created');
          }
        });
    });

    // console.log(movie.item, movie.item._id, 'Movie Info');

    /**PseudoCode
     * Crew Table: Check if name is present
     * add if not, update booleans
     * return id
     * Use Below Code for Movie Model.
     * Replace genre, director, writer, actors with SQL IDs returned
     */
    // Check PG Database to see if the movie is already then, skip if there
    new models.Movies({
      // id: id,
      mongo_id: movie.item.id,
      title: movie.item.title,
      year: movie.item.year,
      release_date: movie.item.release_date,
      genres: JSON.stringify(movie.item.genre),
      awards: JSON.stringify(movie.item.awards),
      director: JSON.stringify(movie.item.directors),
      writer: JSON.stringify(movie.item.writers),
      actors: JSON.stringify(movie.item.actors),
      // box_office: movie.box_Office,
      production: movie.item.production,
      ratings: JSON.stringify(movie.item.ratings),
    }).save();
    // console.log(movie.item.title, ': Server Controller - Movie Added!');
  });

  // console.log('DB Bookshelf: Movies Added');
  callback(null, 'DB Bookshelf: Movies Added');
};

module.exports.updateMovieInfo = (newInfo, callback) => {
  console.log(newInfo, callback, 'updateMovieInfo');
};
