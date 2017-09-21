const async = require('async');
const cron = require('cron');
const models = require('./models');
var tmdb = require('../server/movieAPIHelpers/tmdb');
var tmdbHelper = require('../server/movieAPIHelpers/tmdbHelpers');

// Runs Job Every 10 minutes
var movieCron = new cron.CronJob('30 * * * * *', function() {
  console.info('Movie CRON - job running every minute');
  workMovieQueue();
  // console.info('CRON job completed');
}, null, //function to execute when the job stops
true, //does not start the job right now
'America/Los_Angeles');
// movieCron.start() to start the cron job
//test to see if job is running: movieCron.running === true or === undefined
//movieCron.stop() to stop the job after last element completes

var genreCron = new cron.CronJob('30 * * * * *', function() {
  console.info('Genre CRON - job running every 30 seconds');
  workGenreQueue();
}, null,
true,
'America/Los_Angeles');

var actorCron = new cron.CronJob('30 * * * * *', function() {
  console.info('Actor CRON - job running every 30 seconds');
  workActorQueue();
}, null,
true,
'America/Los_Angeles');

var directorCron = new cron.CronJob('30 * * * * *', function() {
  console.info('Director CRON - job running every 30 seconds');
  workDirectorQueue();
}, null,
true,
'America/Los_Angeles');

var imageCron = new cron.CronJob('30 * * * * *', function() {
  console.info('Director CRON - job running every 30 seconds');
  workImageQueue();
}, null,
true,
'America/Los_Angeles');

/**
* Queue for Movies to be Added to Postgres
*/
var movieQueue = [];
var genreQueue = [];
var actorQueue = [];
var directorQueue = [];
var imageQueue = [];

module.exports.queueAdd = (type, obj) => {
  if (type === 'movie') {
    movieQueue.push(obj);
    console.log(obj.title, ' - Added to Movie Queue');
    // workQueue();
    if (movieCron.running === undefined) {
      console.log('********** starting movieCron');
      movieCron.start();
    }
  } else if (type === 'genre') {
    genreQueue.push(obj);
    console.log(obj.attributes.title, ' - Added to Genre Queue');
    if (genreCron.running === undefined) {
      genreCron.start();
    }
  } else if (type === 'actor') {
    actorQueue.push(obj);
    console.log(obj.attributes.title, ' - Added to Actor Queue');
    if (actorCron.running === undefined) {
      actorCron.start();
    }
  } else if (type === 'director') {
    directorQueue.push(obj);
    console.log(obj.attributes.title, ' - Added to Director Queue');
    if (directorCron.running === undefined) {
      directorCron.start();
    }
  } else {
    imageQueue.push(obj);
    console.log(obj.attributes.name, ' - Added to Image Queue');
    if (imageCron.running === undefined) {
      imageCron.start();
    }
  }
};

var workMovieQueue = function() {
  console.log(movieQueue.length, 'Movie Queue - Pre Work');
  if (movieQueue.length === 0) {
    console.log('Empty Movie Queue - Congrats!');
    // return null;
    // movieCron.stop();
  } else if (movieQueue.length > 0) {
    console.log('Enter Movie Queue Loop with movieQueue ', movieQueue);
    async.eachSeries(movieQueue, function(file, callback) {
      console.log('*********** movie in Queue processing ', file);
      addMovie(file, (err, results) => {
        if (err) {
          console.log('Movie Queue Error ', err);
          callback(err);
        } else {
          console.log(movieQueue.length, 'Queue - Movie Add Completed');
          movieQueue.shift();
          console.log(movieQueue.length, 'Queue - Movie Removed');
          // workQueue();
          console.log('********** Movie Queue Success ', results.attributes.title);
          callback();
        }
      });
    }, function(err) {
      if (err) {
        console.log('********** workMovieQueue eachSeries error ', err);
      } else {
        console.log('************ workMovieQueue success all files complete');
      }
    });
    // movieCron.stop();
  }
};

var workGenreQueue = function() {
  console.log(genreQueue.length, 'Genre Queue - Pre Work');
  if (genreQueue.length === 0) {
    console.log('Empty Genre Queue - Congrats!');
    // genreCron.stop();
  } else if (genreQueue.length > 0) {
    // console.log('Enter Genre Queue Loop with genreQueue ', genreQueue);
    async.eachSeries(genreQueue, function(movie, callback) {
      // console.log('*********** genre in Queue processing ', movie.attributes);
      if (movie) {
        addGenre(movie.attributes, (err, results) => {
          if (err) {
            console.log('Genre Queue Error ', err);
            callback(err);
          } else {
            console.log(genreQueue.length, 'Queue - Genre Add Completed');
            genreQueue.shift();
            console.log(genreQueue.length, 'Queue - Genre Removed');
            // workQueue();
            console.log('********** Genre Queue Success ');
            callback();
          }
        });
      }
    }, function(err) {
      if (err) {
        console.log('********** workGenreQueue eachSeries error ', err);
      } else {
        console.log('************ workGenreQueue success all files complete');
      }
    });
    // genreCron.stop();
  }
};

var workActorQueue = function() {
  console.log(actorQueue.length, 'Actor Queue - Pre Work');
  if (actorQueue.length === 0) {
    console.log('Empty Actor Queue - Congrats!');
    // actorCron.stop();
  } else if (actorQueue.length > 0) {
    // console.log('Enter Actor Queue Loop with actorQueue ', actorQueue);
    async.eachSeries(actorQueue, function(movie, callback) {
      // console.log('*********** actor in Queue processing ', movie.attributes);
      if (movie) {
        addActor(movie.attributes, (err, results) => {
          if (err) {
            console.log('Actor Queue Error ', err);
            callback(err);
          } else {
            console.log(actorQueue.length, 'Queue - Actor Add Completed');
            actorQueue.shift();
            console.log(actorQueue.length, 'Queue - Actor Removed');
            // workQueue();
            console.log('********** Actor Queue Success ');
            callback();
          }
        });
      }
    }, function(err) {
      if (err) {
        console.log('********** workActorQueue eachSeries error ', err);
      } else {
        console.log('************ workActorQueue success all files complete');
      }
    });
    // actorCron.stop();
  }
};

var workDirectorQueue = function() {
  console.log(directorQueue.length, 'Director Queue - Pre Work');
  if (directorQueue.length === 0) {
    console.log('Empty Director Queue - Congrats!');
    // directorCron.stop();
  } else {
    // console.log('Enter Director Queue Loop with directorQueue ', directorQueue);
    async.eachSeries(directorQueue, function(movie, callback) {
      // console.log('*********** director in Queue processing ', movie.attributes);
      if (movie) {
        addDirector(movie.attributes, (err, results) => {
          if (err) {
            console.log('Director Queue Error ', err);
            callback(err);
          } else {
            console.log(directorQueue.length, 'Queue - Director Add Completed');
            directorQueue.shift();
            console.log(directorQueue.length, 'Queue - Director Removed');
            // workQueue();
            console.log('********** Director Queue Success');
            callback();
          }
        });
      }
    }, function(err) {
      if (err) {
        console.log('********** workDirectorQueue eachSeries error ', err);
      } else {
        console.log('************ workDirectorQueue success all files complete');
      }
    });
    // directorCron.stop();
  }
};

var workImageQueue = function() {
  console.log(imageQueue.length, 'Image Queue - Pre Work');
  if (imageQueue.length === 0) {
    console.log('Empty Image Queue - Congrats!');
    // imageCron.stop();
  } else if (imageQueue.length > 0) {
    console.log('Enter Image Queue Loop with imageQueue ', imageQueue);
    async.eachSeries(imageQueue, function(crew, callback) {
      console.log('*********** image in Queue processing ', crew);
      addImage(crew, (err, results) => {
        if (err) {
          console.log('Image Queue Error ', err);
          callback(err);
        } else {
          console.log(imageQueue.length, 'Queue - Image Add Completed');
          imageQueue.shift();
          console.log(imageQueue.length, 'Queue - Image Removed');
          // workQueue();
          console.log('********** Image Queue Success ', results);
          callback();
        }
      });
    }, function(err) {
      if (err) {
        console.log('********** workImageQueue eachSeries error ', err);
      } else {
        console.log('************ workImageQueue success all files complete');
      }
    });
    // imageCron.stop();
  }
};

var addMovie = function(movie, callback) {
  // console.log(movie, 'Movie passed from MongoDB Sync');
  if (movie) {
    // console.log(movie.title, 'Movie passed from MongoDB Sync');
    // console.log(movie, movie.genre, 'Movie Info');
    // var newMovie = new Promise((resolve, reject) => {
    //   if (resolve) {
    //     resolve(movie);
    //   } else {
    //     reject(Error('It broke'));
    //   }
    // });
    // newMovie.then(movie => {
    // console.log('*********** should this become an array of strings? ', movie.genre);
    let genres = movie.genre[0].split(', ');
    let actors = movie.actors[0].split(', ');
    let directors = movie.directors[0].split(', ');
    // let crew = [actors, directors];
    // let metadataObj = {
    //   genres: [],
    //   actors: [],
    //   directors: []
    // };
    // console.log(crew, 'Crew: Array');
    // console.log(movie.genre, 'genres');
    // console.log(genres, 'Genres: Array');
    models.Movies.where({ mongo_id: movie._id })
      .fetch()
      .then(function(model) {
        if (model) {
          console.log(model.attributes.title, ' - Movie is Already in Database');
        } else {
          new models.Movies({
            mongo_id: movie._id,
            title: movie.title,
            year: movie.year,
            release_date: movie.release_date,
            genres: JSON.stringify(genres),
            awards: JSON.stringify(movie.awards),
            director: JSON.stringify(directors),
            actors: JSON.stringify(actors),
            // box_office: movie.box_Office,
            production: movie.production,
            ratings: JSON.stringify(movie.ratings)
          }).save()
          .then(movieObj => {
            module.exports.queueAdd('genre', movieObj);
            module.exports.queueAdd('actor', movieObj);
            module.exports.queueAdd('director', movieObj);
            // console.log(movie, movie.title, 'Movie Added');
            console.log(movieObj.attributes.title, ': PG Movie Added');
            callback(null, movieObj);
          })
        }
      })
      .catch((err) => {
        console.log('Movie Add - Promise Error', err);
        callback(err);
      });
    }
  };
  /**
   * Promise: Helper function to create genre
   * @param {Genre} genre
   */
var addGenre = function(movie, callback1) {
  // return new Promise((resolve, reject) => {
    // if (resolve) {
  var currentGenreList = JSON.parse(movie.genres);
  async.map(currentGenreList, function(genre, callback2) {
    console.log('*********** in addGenre ', genre);
    models.Genres.where({ name: genre }).fetch()
    .then(genre_record => {
      if (genre_record) {
        console.log(genre_record.name, ' Genre is Already in Database');
        callback2(null, genre_record.id);
      } else {
        new models.Genres({ name: genre }).save()
        .then(genre_record => {
          console.log(genre_record.attributes.name, ' Genre Saved in Database');
          callback2(null, genre_record.id);
        })
        .catch(err => {
          console.log('*********** new genre save error ', err);
          callback2(err);
        });
      }
    });
  }, function(err, genre_results) {
    if (err) { throw err; }
    console.log('************* updating movie with new genreList ', genre_results);
    models.Movies.where({ id: movie.id }).fetch()
      .then(movie => {
        return movie.save({genres: JSON.stringify(genre_results)}, {patch: true});
      })
      .then((movie) => {
        console.log('*********** movie successfully updated with new genre field ');
        callback1(null, movie);
      })
      .catch(err => {
        callback1(err);
      });
  });
};

//   models.Genres.where({ name: genre })
//     .fetch()
//     .then(function(model) {
//       if (model) {
//         console.log(model.attributes, 'Genre is Already in Database');
//         metadataObj.genres.push(model.attributes.id);
//         resolve(model.attributes.id);
//       } else {
//         new models.Genres({
//           name: genre
//         }).save()
//           .then(function(model) {
//             // console.log(model.attributes, 'Genre just added to Database');
//             console.log(genre, ': Genre Created');
//             metadataObj.genres.push(model.attributes.id);
//             // resolve(model.attributes.id);
//             callback(null, 'success');
//           })
//           .catch(function(err) {
//             console.error(err, 'Genre: Create Error');
//             callback(err);
//           });
//       }
//     })
//     .catch(err => {
//       console.log('********** addGenre queue err ', err);
//     });
//     // } else {
//     //   reject(Error('Genre Not Created'));
//     // }
//   // });
// };
      /**
      * Promise: Helper function to create Actor
      * @param {Genre} genre
      */
// var createActor = function(actor) {
//   return new Promise((resolve, reject) => {
//     if (resolve) {
//       models.Crew.where({ name: actor })
//         .fetch()
//         .then(function(model) {
//           if (model) {
//             // console.log(model.attributes.name, 'Actor is Already in Database');
//             model.save({
//               name: actor,
//               actor: true,
//               director: false || model.get('director')
//             });
//             metadataObj.actors.push(model.attributes.id);
//             resolve(model.attributes.id);
//           } else {
//             let other = false;
//             for (var i = 0; i < directors.length; i++) {
//               if (actor === directors[i]) {
//                 // console.log(actor, 'Actor is Also Director');
//                 other = true;
//               }
//             }
//             new models.Crew({
//               name: actor,
//               actor: true,
//               director: other,
//             }).save()
//               .then(function(model) {
//                 console.log(actor, ': Actor Created');
//                 metadataObj.actors.push(model.attributes.id);
//                 resolve(model.attributes.id);
//               })
//               .catch(function(err) {
//                 console.error(err, 'Actor: Create Error');
//               });
//           }
//         });
//     } else {
//       reject(Error('Crew Not Added'));
//     }
//   });
// };

var addActor = function(movie, callback1) {
  var currentActorList = JSON.parse(movie.actors);
  // console.log('********* addActor input ', actor);
  async.map(currentActorList, function(actor, callback2) {
    console.log('*********** in addActor ', actor);
    models.Crew.where({ name: actor }).fetch()
    .then(actor_record => {
      // console.log('************* actor_record ', actor_record);
      if (actor_record) {
        console.log(actor_record.name, ' Actor is Already in Database');
        if (actor_record.actor !== true) {
          //update to be true
          actor_record.save({actor: true}, {patch: true});
        }
        callback2(null, actor_record.id);
      } else {
        new models.Crew({ name: actor, actor: true}).save()
        .then(actor_record => {
          console.log(actor_record.attributes.name, ' Actor Saved to Database');
          module.exports.queueAdd('image', actor_record);
          callback2(null, actor_record.id);
        })
        .catch(err => {
          console.log('*********** new actor save error ', err);
          callback2(err);
        });
      }
    });
  }, function(err, actor_results) {
    if (err) { throw err; }
    console.log('*********** update movie with actorList ', actor_results);
    models.Movies.where({ id: movie.id }).fetch()
      .then(movie => {
        return movie.save({actors: JSON.stringify(actor_results)}, {patch: true});
      })
      .then((movie) => {
        console.log('*********** movie successfully updated with new actor field ');
        callback1(null, movie);
      })
      .catch(err => {
        callback1(err);
      });
  });
};

var addDirector = function(movie, callback1) {
  // console.log('********* addDirector input ', director);
  var currentDirectorList = JSON.parse(movie.director);
  async.map(currentDirectorList, function(director, callback2) {
    console.log('*********** in addDirector ', director);
    models.Crew.where({ name: director }).fetch()
    .then(director_record => {
      console.log('********** in addDirector director_record ', director_record);
      if (director_record) {
        console.log(director_record.name, ' Director is Already in Database');
        if (actor_record.director !== true) {
          //update to be true
          actor_record.save({director: true}, {patch: true});
        }
        callback2(null, director_record.id);
      } else {
        new models.Crew({ name: director, director: true}).save()
        .then(director_record => {
          console.log(director_record.attributes.name, ' Director Saved in Database');
          module.exports.queueAdd('image', director_record);
          callback2(null, director_record.id);
        })
        .catch(err => {
          console.log('*********** new director save error ', err);
          callback2(err);
        });
      }
    });
  }, function(err, director_results) {
    if (err) { throw err; }
    console.log('************* updating movie with directorList ', director_results);
    models.Movies.where({ id: movie.id }).fetch()
      .then(movie => {
        return movie.save({director: JSON.stringify(director_results)}, {patch: true});
      })
      .then((movie) => {
        console.log('*********** movie successfully updated with new director field ');
        callback1(null, movie);
      })
      .catch(err => {
        callback1(err);
      });
  });
};

var addImage = function(crew, callback) {
  console.log('************* crew in addImage ', crew.attributes);
  tmdbHelper.getCrewByName(crew.attributes.name, (err, crew_id) => {
    if (err) {
      console.log('********* getCrewByName actor error ', err);
    } else {
      tmdbHelper.getCrewImageById(crew_id, (err, crewObj) => {
        if (err) {
          console.log('********** getCrewImageById actor error ', err);
        } else if (crewObj === undefined || crewObj === null) {
          console.log('************ actor crewObj is undefined or null ', crewObj);
        } else {
          if (crewObj.profiles.length > 0) {
            var crew_url = tmdb.images_uri + crewObj.profiles[0].file_path;
            models.Crew.where({id: crew_record.attributes.id})
              .save({image_url: crew_url}, {patch: true})
              .then(result => {
                // resolve(crew_record.attributes.id);
                callback(null, crew_record.attributes.id);
              })
              .catch(err => {
                callback(err);
              })
          }
        }
      });
    }
  });
};
      /**
       * Promise: Helper function to create Director
       * @param {Director} Director
       */
      // var createDirector = function(director) {
      //   return new Promise((resolve, reject) => {
      //     if (resolve) {
      //       models.Crew.where({ name: director })
      //         .fetch()
      //         .then(function(model) {
      //           if (model) {
      //             // console.log(model.attributes.name, 'Director is Already in Database');
      //             // Change Boolean to Actor/Writer to True
      //             model.save({
      //               name: director,
      //               actor: false || model.get('actor'),
      //               director: true
      //             });
      //             metadataObj.directors.push(model.attributes.id);
      //             // Send Kelly model.attributes
      //             resolve(model.attributes.id);
      //           } else {
      //             let other = false;
      //             for (var i = 0; i < actors.length; i++) {
      //               if (director === actors[i]) {
      //                 // console.log(director, 'Director is Also Actor');
      //                 other = true;
      //               }
      //             }
      //             new models.Crew({
      //               name: director,
      //               actor: other,
      //               director: true,
      //             }).save()
      //               .then(function(model) {
      //                 console.log(director, ': Director Created');
      //                 metadataObj.directors.push(model.attributes.id);
      //                 resolve(model.attributes.id);
      //               })
      //               .catch(function(err) {
      //                 console.error(err, 'Director: Create Error');
      //               });
      //           }
      //         });
      //     } else {
      //       reject(Error('Director Not Added'));
      //     }
      //   });
      // };
//       var genrePromises = genres.map(createGenre);
//       var actorPromises = actors.map(createActor);
//       var directorPromises = directors.map(createDirector);
//       var moviePromises = genrePromises.concat(actorPromises, directorPromises);
//       /**
//       * PROMISES: Execute all promises to get Postgresql ID & send through as an object of arrays (metadata) to be inserted when movies are created
//       */
//       Promise.all(moviePromises)
//         .then((unsortedIDs) => {
//           console.log(unsortedIDs, 'Promises All: Receiving unsortedIDs');
//           metadataObj.genres.sort();
//           metadataObj.actors.sort();
//           metadataObj.directors.sort();
//           // console.log(metadataObj, 'Meta Data');
//           return metadataObj;
//         })
//         .then((metadata) => {
//           // console.log(movie, genre_array, 'Before Creating Movie');
//           console.log(metadata, 'Before Updating Movie Metadata');
//           models.Movies.where({ mongo_id: movie._id })
//             .save({
//               genres: JSON.stringify(metadata.genres),
//               actors: JSON.stringify(metadata.actors),
//               director: JSON.stringify(metadata.directors)
//             }, { patch: true })
//             .catch((err) => {
//               console.log(err, 'Movie Update - Promise ALl Error');
//             });
//         });
//       // callback(null, 'DB Bookshelf: Movies Added');
//       callback(null, 'Movie Added');
//     });
//   } else { //End of If Statement for Movie Array
//     console.log('Error - Empty Movie Array');
//     callback('Error - Empty Movie', null);
//   }
// };

module.exports.getAllMovies = (req, res) => {
  models.Movies.fetchAll()
    .then(movies => {
      // console.log(movies, 'DB Model Movies Fetched');
    })
    .error(err => {
      console.log('Server Controller Movies - Error Caught');
    });
};

module.exports.updateMovieInfo = (newInfo, callback) => {
  console.log(newInfo, callback, 'updateMovieInfo');
};

// module.exports.movieQueue = movieQueue;
// module.exports.workQueue = workQueue;
