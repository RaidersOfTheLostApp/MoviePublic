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
      var new_movie = new Promise((resolve, reject) => {
        if (resolve) {
          resolve(movie);
        } else {
          reject(Error('It broke'));
        }
      });

      new_movie.then(movie => {
        let genres = movie.genre[0].split(', ');
        // console.log(movie.genre, 'genres');
        // console.log(genres, 'Genres: Array');
        var create_genre = function create_genre(genre) { // sample async action
          return new Promise((resolve, reject) => {
            if (resolve) {
              models.Genres.where({ name: genre })
                .fetch()
                .then(function(model) {
                  if (model) {
                    console.log(model.attributes, 'Genre is Already in Database');
                    // console.log('Genre is Already in Database');
                    // console.log(genre_id, 'IDs to put into Movie Table - No Add');
                    // return model.attributes.id;
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
                            // return model.attributes.id;
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

        var promises_array = genres.map(create_genre);
        Promise.all(promises_array)
          // Temp for Learning, can get rid of later
          // .then((genre_array) => {
          //   console.log(genre_array, 'Receiving Genre Array');
          // })

          // .then((genre_id) => {
          //   console.log('receiving genre id');
          //   let actor_id = [];
          //   let director_id = [];
          //   let crew_object = {
          //     actors: [],
          //     directors: [],
          //   };
          //   return crew_object;
          // })
          .then((genre_array) => {
            // console.log(movie, genre_id, 'Before Creating Movie');
            console.log(genre_array, 'Before Creating Movie');
            models.Movies.where({ mongo_id: movie.id })
              // models.Movies.where({ title: movie.title })
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
                    genres: JSON.stringify(genre_array),
                    awards: JSON.stringify(movie.awards),
                    director: JSON.stringify(movie.directors),
                    actors: JSON.stringify(movie.actors),
                    // box_office: movie.box_Office,
                    production: movie.production,
                    ratings: JSON.stringify(movie.ratings),
                  }).save();
                  // console.log(movie, movie.title, 'Movie Added');
                  console.log(movie.title, ' - Movie Added');
                }
              });
          }) //End of Movie Add
          .catch((err) => {
            console.log(err, 'Promise Error'); // Error!
          });
      }); //end of movie for each

      // var crew_add = (movie, callback) => {
      //   let actors = movie.actors[0].split(', ');
      //   let directors = movie.directors[0].split(', ');

      //   let crew = [actors, directors];
      //   // console.log(crew, 'Crew: Array');
      //   let tempCrew = [];

      //   crew.forEach((type, index) => {
      //     // console.log(type, index, 'type & index');
      //     type.forEach((crew_member) => {
      //       // console.log(crew_member, 'Solo Genre');
      //       models.Crew.where({ name: crew_member })
      //         .fetch()
      //         .then(function(model) {
      //           if (model) {
      //             console.log(model.attributes.name, 'Crew Member is Already in Database');
      //             // Change Boolean for actor/writer to True
      //             tempCrew.push(model.attributes.id);
      //           } else {
      //             let isActor = false;
      //             let isDirector = false;
      //             if (index === 0) {
      //               isActor = true;
      //             } else if (index === 1) {
      //               isDirector = true;
      //             }
      //             new models.Crew({
      //               name: crew_member,
      //               actor: isActor,
      //               director: isDirector,
      //             }).save()
      //               .then(function() {
      //                 models.Crew.where({ name: crew_member })
      //                   .fetch()
      //                   .then(function(model) {
      //                     console.log(crew_member, 'Crew Member Created');
      //                     tempCrew.push(model.attributes.id);
      //                   });
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
      //           callback(crew_object);
      //         });
      //     });
      //   });
      // };

      // crew_add(movie, () => {
      //   console.log('invoked');
      // });

      // genre_add(movie, (genre_id) => {
      //   // console.log(movie, genre_id, 'Before Creating Movie');
      //   models.Movies.where({ mongo_id: movie.id })
      //     // models.Movies.where({ title: movie.title })
      //     .fetch()
      //     .then(function(model) {
      //       if (model) {
      //         // console.log(model.attributes, 'Movie is Already in Database');
      //         console.log(model.attributes.title, 'Movie is Already in Database');
      //       } else {
      //         new models.Movies({
      //           // id: id,
      //           mongo_id: movie.id,
      //           title: movie.title,
      //           year: movie.year,
      //           release_date: movie.release_date,
      //           genres: JSON.stringify(genre_id),
      //           awards: JSON.stringify(movie.awards),
      //           director: JSON.stringify(movie.directors),
      //           actors: JSON.stringify(movie.actors),
      //           // box_office: movie.box_Office,
      //           production: movie.production,
      //           ratings: JSON.stringify(movie.ratings),
      //         }).save();
      //         // console.log(movie, movie.title, 'Movie Added');
      //         console.log(movie.title, 'Movie Added');
      //       }
      //     });
      // });
      // console.log(movie.title, ': Server Controller - Movie Added!');
      callback(null, 'DB Bookshelf: Movies Added');
    }); //end of movie array
  } else { //End of If Statement for Movie Array
    // console.log('DB Bookshelf: Movies Added');
    console.log('Error - Empty Movie Array');
  }
};

module.exports.updateMovieInfo = (newInfo, callback) => {
  console.log(newInfo, callback, 'updateMovieInfo');
};
