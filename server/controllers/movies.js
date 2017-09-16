const models = require('../../db/models');

module.exports.getAllMovies = (req, res) => {
  models.Movies.fetchAll()
    .then(movies => {
      // console.log(movies, 'DB Model Movies Fetched');
    })
    .error(err => {
      console.log('Server Controller Movies - Error Caught');
    });
};

module.exports.addMovies = (movie_array, callback) => {
  // console.log(movie_array, 'Movie Array passed from Server Search');
  if (movie_array) {
    movie_array.forEach((movie) => {
      // console.log(movie, movie.genre, 'Movie Info');
      var newMovie = new Promise((resolve, reject) => {
        if (resolve) {
          resolve(movie);
        } else {
          reject(Error('It broke'));
        }
      });

      newMovie.then(movie => {
        let genres = movie.genre[0].split(', ');
        let actors = movie.actors[0].split(', ');
        let directors = movie.directors[0].split(', ');
        let crew = [actors, directors];
        var metadataObj = {
          genres: [],
          actors: [],
          directors: []
        };
        // console.log(crew, 'Crew: Array');
        // console.log(movie.genre, 'genres');
        // console.log(genres, 'Genres: Array');
        /**
         * Promise: Helper function to create genre
         * @param {Genre} genre
         */
        var createGenre = function createGenre(genre) {
          return new Promise((resolve, reject) => {
            if (resolve) {
              models.Genres.where({ name: genre })
                .fetch()
                .then(function(model) {
                  if (model) {
                    // console.log(model.attributes, 'Genre is Already in Database');
                    metadataObj.genres.push(model.attributes.id);
                    resolve(model.attributes.id);
                  } else {
                    new models.Genres({
                      name: genre
                    }).save()
                      .then(function() {
                        models.Genres.where({ name: genre })
                          .fetch()
                          .then(function(model) {
                            // console.log(model.attributes, 'Genre just added to Database');
                            console.log(genre, 'Genre Created');
                            metadataObj.genres.push(model.attributes.id);
                            resolve(model.attributes.id);
                          });
                      });
                  }
                });
            } else {
              reject(Error('Genre Not Created'));
            }
          });
        };
        /**
         * Promise: Helper function to create Actor
         * @param {Genre} genre
         */
        var createActor = function createActor(actor) {
          return new Promise((resolve, reject) => {
            if (resolve) {
              models.Crew.where({ name: actor })
                .fetch()
                .then(function(model) {
                  if (model) {
                    // console.log(model.attributes.name, 'Actor is Already in Database');
                    model.save({
                      name: actor,
                      actor: true,
                      director: false || model.get('director')
                    });
                    metadataObj.actors.push(model.attributes.id);
                    resolve(model.attributes.id);
                  } else {

                    let other = false;
                    for (var i = 0; i < directors.length; i++) {
                      if (actor === directors[i]) {
                        // console.log(actor, 'Actor is Also Director');
                        other = true;
                      }
                    }

                    new models.Crew({
                      name: actor,
                      actor: true,
                      director: other,
                    }).save()
                      .then(function() {
                        models.Crew.where({ name: actor })
                          .fetch()
                          .then(function(model) {
                            console.log(actor, 'Actor Created');
                            metadataObj.actors.push(model.attributes.id);
                            resolve(model.attributes.id);
                          });
                      });
                  }
                });
            } else {
              reject(Error('Crew Not Added'));
            }
          });
        };
        /**
         * Promise: Helper function to create Director
         * @param {Director} Director
         */
        var createDirector = function createDirector(director) {
          return new Promise((resolve, reject) => {
            if (resolve) {
              models.Crew.where({ name: director })
                .fetch()
                .then(function(model) {
                  if (model) {
                    // console.log(model.attributes.name, 'Director is Already in Database');
                    // Change Boolean to Actor/Writer to True
                    model.save({
                      name: director,
                      actor: false || model.get('actor'),
                      director: true
                    });
                    metadataObj.directors.push(model.attributes.id);
                    resolve(model.attributes.id);
                  } else {

                    let other = false;
                    for (var i = 0; i < actors.length; i++) {
                      if (director === actors[i]) {
                        // console.log(director, 'Director is Also Actor');
                        other = true;
                      }
                    }

                    new models.Crew({
                      name: director,
                      actor: other,
                      director: true,
                    }).save()
                      .then(function() {
                        models.Crew.where({ name: director })
                          .fetch()
                          .then(function(model) {
                            console.log(director, 'Director Created');
                            metadataObj.directors.push(model.attributes.id);
                            resolve(model.attributes.id);
                          });
                      });
                  }
                });
            } else {
              reject(Error('Director Not Added'));
            }
          });
        };

        var genrePromises = genres.map(createGenre);
        var actorPromises = actors.map(createActor);
        var directorPromises = directors.map(createDirector);
        var moviePromises = genrePromises.concat(actorPromises, directorPromises);
        /**
        * PROMISES: Execute all promises to get Postgresql ID & send through as an object of arrays (metadata) to be inserted when movies are created
        */
        Promise.all(moviePromises)
          .then((unsortedIDs) => {
            // console.log(unsortedIDs, 'Promises All: Receiving unsortedIDs');
            metadataObj.genres.sort();
            metadataObj.actors.sort();
            metadataObj.directors.sort();
            // console.log(metadataObj, 'Meta Data');
            return metadataObj;
          })
          .then((metadata) => {
            // console.log(movie, genre_array, 'Before Creating Movie');
            // console.log(metadata, 'Before Creating Movie');
            models.Movies.where({ mongo_id: movie.id })
              .fetch()
              .then(function(model) {
                if (model) {
                  console.log(model.attributes.title, ' - Movie is Already in Database');
                } else {
                  new models.Movies({
                    // id: id,
                    mongo_id: movie.id,
                    title: movie.title,
                    year: movie.year,
                    release_date: movie.release_date,
                    genres: JSON.stringify(metadata.genres),
                    awards: JSON.stringify(movie.awards),
                    director: JSON.stringify(metadata.directors),
                    actors: JSON.stringify(metadata.actors),
                    // box_office: movie.box_Office,
                    production: movie.production,
                    ratings: JSON.stringify(movie.ratings),
                  }).save();
                  // console.log(movie, movie.title, 'Movie Added');
                  console.log(movie.title, ' - Movie Added');
                }
              });
          })
          .catch((err) => {
            console.log(err, 'Movie Add - Promise Error');
          });
      });
    }); //end of movie array
    callback(null, 'DB Bookshelf: Movies Added');
  } else { //End of If Statement for Movie Array
    console.log('Error - Empty Movie Array');
  }
};

module.exports.updateMovieInfo = (newInfo, callback) => {
  console.log(newInfo, callback, 'updateMovieInfo');
};
