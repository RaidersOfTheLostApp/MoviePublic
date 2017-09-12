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
  // console.log(movie_array, 'Movie Array passed from Server Search');
  movie_array.forEach((movie) => {
    // console.log(movie, movie.genre, 'Movie Info');
    let actor_id = [];
    let director_id = [];
    let writer_id = [];

    /**
     * Genre Add will retreive a movie's genres, create a new data row in Postgres if the genre is not there, and create an array of Postgres IDs
     * @param {*} movie - One Movie
     * Returns an array of Postgresql IDs of Genres
     */
    var genre_add = (movie, callback) => {
      let genre_id = [];
      let genre = movie.genre[0].split(', ');
      // console.log(genre, 'Genres: Array');
      genre.forEach((genre) => {
        // console.log(genre, 'Solo Genre');
        models.Genres.where({ name: genre })
          .fetch()
          .then(function(model) {
            if (model) {
              console.log(model.attributes, 'Genre is Already in Database');
              // console.log('Genre is Already in Database');
              genre_id.push(model.attributes.id);
              console.log(genre_id, 'IDs to put into Movie Table - No Add');
            } else {
              new models.Genres({
                name: genre
              }).save()
                .then(function() {
                  models.Genres.where({ name: genre })
                    .fetch()
                    .then(function(model) {
                      console.log(genre, 'Genre Created');
                      // if (model) {
                      console.log(model.attributes, 'Genre just added to Database');
                      genre_id.push(model.attributes.id);
                      // }
                    })
                    .then(() => {
                      console.log(genre_id, 'IDs to put into Movie Table');
                      callback(genre_id);
                    });
                });
            }
          });
      });
    };

    genre_add(movie, (genre_id) => {
      // console.log(genre_id, 'Before Creating Movie');
      new models.Movies({
        // id: id,
        mongo_id: movie.id,
        title: movie.title,
        year: movie.year,
        release_date: movie.release_date,
        genres: JSON.stringify(genre_id),
        awards: JSON.stringify(movie.awards),
        director: JSON.stringify(movie.directors),
        writer: JSON.stringify(movie.writers),
        actors: JSON.stringify(movie.actors),
        // box_office: movie.box_Office,
        production: movie.production,
        ratings: JSON.stringify(movie.ratings),
      }).save();
    });
    // console.log(movie.title, ': Server Controller - Movie Added!');

    /**PseudoCode
     * Crew Table: Check if name is present
     * add if not, update booleans
     * return id
     * Use Below Code for Movie Model.
     * Replace genre, director, writer, actors with SQL IDs returned
     */
    // Check PG Database to see if the movie is already then, skip if there
  });
  // console.log('DB Bookshelf: Movies Added');
  callback(null, 'DB Bookshelf: Movies Added');
};

module.exports.updateMovieInfo = (newInfo, callback) => {
  console.log(newInfo, callback, 'updateMovieInfo');
};
