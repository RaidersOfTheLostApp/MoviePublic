const models = require('../../db/models');

module.exports.getAllMovies = (req, res) => {
  models.Movies.fetchAll()
    .then(movies => {
      console.log(movies, 'DB Model Movies Fetched');
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
      let genre_id = [];
      let actor_id = [];
      let director_id = [];
      let writer_id = [];
      let crew_object = {
        actors: [],
        directors: [],
        writers: []
      };
      /**
       * Genre Add will retreive a movie's genres, create a new data row in Postgres if the genre is not there, and create an array of Postgres IDs
       * @param {*} movie - One Movie
       * Returns an array of Postgresql IDs of Genres
       */

      var genre_add = (movie, callback) => {
        // console.log(movie.genre, 'genres');
        let genre = movie.genre[0].split(', ');
        // console.log(genre, 'Genres: Array');
        genre.forEach((genre) => {
          // console.log(genre, 'Solo Genre');
          models.Genres.where({ name: genre })
            .fetch()
            .then(function(model) {
              if (model) {
                // console.log(model.attributes, 'Genre is Already in Database');
                // console.log('Genre is Already in Database');
                genre_id.push(model.attributes.id);
                // console.log(genre_id, 'IDs to put into Movie Table - No Add');
              } else {
                new models.Genres({
                  name: genre
                }).save()
                  .then(function() {
                    models.Genres.where({ name: genre })
                      .fetch()
                      .then(function(model) {
                        // console.log(genre, 'Genre Created');
                        // console.log(model.attributes, 'Genre just added to Database');
                        genre_id.push(model.attributes.id);
                      });
                  });
              }
            })
            .then(() => {
              console.log(genre_id, movie.title, 'IDs to put into Movie Table');
              // callback(genre_id);
            });
        });
      };

      // var crew_add = (movie, callback) => {
      //   let actors = movie.actors[0].split(', ');
      //   let directors = movie.directors[0].split(', ');
      //   let writers = movie.writers[0].split(', ');
      //   //Removing Parenthesis
      //   writers.forEach((writer) => {
      //     let p = writer.indexOf('(');
      //     writer.slice(0, p - 1);
      //     console.log(writer, 'writer');
      //   });
      //   let crew = [actors, directors, writers];
      //   // console.log(writers, 'Crew: Array');
      //   crew.forEach((type, index) => {
      //     // console.log(type, index, 'type & index');
      //     type.forEach((crew_member) => {
      //       // console.log(crew_member, 'Solo Genre');
      //       let tempCrew = [];

      //       models.Crew.where({ name: crew_member })
      //         .fetch()
      //         .then(function(model) {
      //           if (model) {
      //             // console.log(model.attributes, 'Genre is Already in Database');
      //             // console.log(model.attributes.name, 'Crew Member is Already in Database');
      //             // Change Boolean for actor/writer to True
      //             tempCrew.push(model.attributes.id);
      //             // console.log(genre_id, 'IDs to put into Movie Table - No Add');
      //           } else {
      //             let isActor = false;
      //             let isDirector = false;
      //             let isWriter = false;
      //             if (index === 0) {
      //               isActor = true;
      //             } else if (index === 1) {
      //               isDirector = true;
      //             } else if (index === 2) {
      //               isWriter = true;
      //             }
      //             new models.Crew({
      //               name: crew_member,
      //               actor: isActor,
      //               director: isDirector,
      //               writer: isWriter
      //             }).save()
      //               .then(function() {
      //                 models.Crew.where({ name: crew_member })
      //                   .fetch()
      //                   .then(function(model) {
      //                     // console.log(crew_member, 'Crew Member Created');
      //                     tempCrew.push(model.attributes.id);
      //                   });
      //               })
      //               .catch(function(err) {
      //                 console.log('Movie Add Err: ', err);
      //               });
      //           }
      //         })
      //         .then(() => {
      //           if (tempCrew.length === 0) {
      //             return null;
      //           }
      //           if (index === 0) {
      //             crew_object.actors = tempCrew;
      //           } else if (index === 1) {
      //             crew_object.directors = tempCrew;
      //           } else if (index === 2) {
      //             crew_object.writers = tempCrew;
      //           }
      //           console.log(crew_object, index, 'Crew IDs to put into Movie Table');
      //           // callback(crew_object);
      //         });
      //     });
      //   });
      // };

      // crew_add(movie, () => {
      //   console.log('invoked');
      // });

      genre_add(movie, (genre_id) => {
        // console.log(movie, genre_id, 'Before Creating Movie');
        models.Movies.where({ mongo_id: movie.id, title: movie.title })
          // models.Movies.where({ title: movie.title })
          .fetch()
          .then(function(model) {
            if (model) {
              // console.log(model.attributes, 'Movie is Already in Database');
              // console.log(model.attributes.title, 'Movie is Already in Database');
            } else {
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
              // console.log(movie, movie.title, 'Movie Added');
              console.log(movie.title, 'Movie Added');
            }
          });
      });
      // console.log(movie.title, ': Server Controller - Movie Added!');
    });
    // console.log('DB Bookshelf: Movies Added');
    callback(null, 'DB Bookshelf: Movies Added');
  } else {
    console.log('Error - Empty Movie Array');
  }
};

module.exports.updateMovieInfo = (newInfo, callback) => {
  console.log(newInfo, callback, 'updateMovieInfo');
};
