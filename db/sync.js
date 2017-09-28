const async = require('async');
const cron = require('cron');
const models = require('./models');
var tmdb = require('../server/movieAPIHelpers/tmdb');
var tmdbHelper = require('../server/movieAPIHelpers/tmdbHelpers');

// Runs Job Every 10 minutes
var movieCron = new cron.CronJob('05 * * * * *', function() {
  console.info('Movie CRON - job running every 5 sec');
  workMovieQueue();
  // console.info('CRON job completed');
}, null, //function to execute when the job stops
true, //does not start the job right now
'America/Los_Angeles');
// movieCron.start() to start the cron job
//test to see if job is running: movieCron.running === true or === undefined
//movieCron.stop() to stop the job after last element completes

var genreCron = new cron.CronJob('05 * * * * *', function() {
  console.info('Genre CRON - job running every 5 sec');
  workGenreQueue();
}, null,
true,
'America/Los_Angeles');

var actorCron = new cron.CronJob('05 * * * * *', function() {
  console.info('Actor CRON - job running every 5 sec');
  workActorQueue();
}, null,
true,
'America/Los_Angeles');

var directorCron = new cron.CronJob('05 * * * * *', function() {
  console.info('Director CRON - job running every 5 sec');
  workDirectorQueue();
}, null,
true,
'America/Los_Angeles');

var imageCron = new cron.CronJob('05 * * * * *', function() {
  console.info('Image CRON - job running every 5 sec');
  workImageQueue();
}, null,
true,
'America/Los_Angeles');

//TODO: uncomment below when ready to link to Twilio API
// var upcomingCron = new cron.CronJob('* 05 * * * *', function() {
//   console.info('Upcoming CRON - job running every 5 mins');
//   checkUpcomingQueue();
// }, null,
// true,
// 'America/Los_Angeles');

Date.prototype.addDays = function(days) {
 var dat = new Date(this.valueOf());
 dat.setDate(dat.getDate() + days);
 return dat;
};

var checkUpcomingQueue = function() {
  console.log('Upcoming Queue - Pre Work');
  //get all movies from upcoming where release date in minus 7 days
  //get phone number for all users with that id in follow_imdbMovies field
  //send twilio to those phone numbers with movie name and release date
  var today = new Date();
  // console.log('******* in a week ', today.addDays(7));
  models.Upcoming.query(function(qb) {
    qb.where('release_date', '>=', today)
      .andWhere('release_date', '<', today.addDays(7));
  }).fetchAll()
    .then(soonReleases => {
      // console.log('********* soonReleases ', soonReleases);
      //once have soonReleases...

      // async.eachSeries(upcomingQueue, function(upcoming, callback) {
      //   // console.log('*********** image in Queue processing ', crew);
      //   //TODO: create this
      //   // findUserMatch(upcoming.models.attributes.imdb_id, (err, results) => {
      //   //   if (err) {
      //   //     console.log('Upcoming find user match Error ', err);
      //   //     callback(err);
      //   //   } else {
      //   //     addUserTwilioQueue(results); //TODO: create this
      //   //     console.log('********** Find user Queue Success ', results);
      //   //     callback();
      //   //   }
      //   // });
      // }, function(err) {
      //   if (err) {
      //     console.log('********** upcomingQueue eachSeries error ', err);
      //   } else {
      //     console.log('************ upcomingQueue success all files complete');
      //   }
      // });
    })
    .catch(err => {
      console.log('******** error ', err);
    })
};

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
    // console.log('************ movieCron running ', movieCron.running);
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
  // } else if (type === 'upcoming') {
  //   upcomingQueue.push(obj);
  //   console.log(obj.Title, ' - Added to Movie Queue');
  //   // workQueue();
  //   // console.log('************ movieCron running ', movieCron.running);
  //   if (movieCron.running === undefined) {
  //     console.log('********** starting movieCron');
  //     movieCron.start();
  //   }
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
    // console.log('Enter Movie Queue Loop with movieQueue ', movieQueue);
    async.eachSeries(movieQueue, function(file, callback) {
      // console.log('*********** movie in Queue processing ', file);
      addMovie(file, (err, results) => {
        if (err) {
          console.log('Movie Queue Error ', err);
          callback(err);
        } else {
          console.log(movieQueue.length, 'Queue - Movie Add Completed');
          // console.log('*********** current movieQueue ', movieQueue);
          movieQueue.shift();
          console.log(movieQueue.length, 'Queue - Movie Removed');
          // console.log('*********** current movieQueue ', movieQueue);
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
            // console.log('*********** current genreQueue ', genreQueue);
            genreQueue.shift();
            console.log(genreQueue.length, 'Queue - Genre Removed');
            // console.log('*********** current genreQueue ', genreQueue);
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
            // console.log('*********** current actorQueue ', actorQueue);
            actorQueue.shift();
            console.log(actorQueue.length, 'Queue - Actor Removed');
            // console.log('*********** current actorQueue ', actorQueue);
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
            // console.log('*********** current directorQueue ', directorQueue);
            directorQueue.shift();
            console.log(directorQueue.length, 'Queue - Director Removed');
            // console.log('*********** current directorQueue ', directorQueue);
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
    // console.log('Enter Image Queue Loop with imageQueue ', imageQueue);
    async.eachSeries(imageQueue, function(crew, callback) {
      if (crew === undefined) {
        callback('crew is undefined');
      }
      console.log('*********** image in Queue processing ', crew.attributes);
      addImage(crew.attributes, (err, results) => {
        console.log('*********** addImage results ', results);
        // console.log('********** addImage err ', err);
        if (err) {
          console.log('Image Queue Error ', err);
          callback(err);
        } else if (!results) {
          console.log('********** crew value is undefined or null ', results);
          callback();
        } else {
          console.log(imageQueue.length, 'Queue - Image Add Completed');
          // console.log('*********** current imageQueue ', imageQueue);
          imageQueue.shift();
          console.log(imageQueue.length, 'Queue - Image Removed');
          // console.log('*********** current imageQueue ', imageQueue);
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
          console.log(model.attributes.title, ' - Movie is Already in Database During Postgres Sync');
          callback(null, model);
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
            });
        }
      })
      .catch((err) => {
        console.log('Movie Add - Promise Error', err);
        callback(err);
      });
  }
};

var addGenre = function(movie, callback1) {
  var currentGenreList = JSON.parse(movie.genres);
  async.map(currentGenreList, function(genre, callback2) {
    console.log('*********** in addGenre ', genre);
    models.Genres.where({ name: genre }).fetch()
      .then(genre_record => {
        if (genre_record) {
          console.log(genre_record.attributes.name, ' Genre is Already in Database');
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

var addActor = function(movie, callback1) {
  var currentActorList = JSON.parse(movie.actors);
  // console.log('********* addActor input ', actor);
  async.map(currentActorList, function(actor, callback2) {
    console.log('*********** in addActor ', actor);
    models.Crew.where({ name: actor }).fetch()
      .then(actor_record => {
        if (actor_record) {
          console.log('************* actor_record ', actor_record.attributes.name);
          console.log(actor_record.attributes.name, ' Actor is Already in Database');
          if (actor_record.attributes.actor !== true) {
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
      // console.log('********** in addDirector director_record ', director_record);
        if (director_record) {
          console.log(director_record.attributes.name, ' Director is Already in Database');
          if (director_record.attributes.director !== true) {
            director_record.save({director: true}, {patch: true});
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
  // console.log('************* crew in addImage ', crew.attributes);
  tmdbHelper.getCrewByName(crew.name, (err, crew_id) => {
    if (err) {
      console.log('********* getCrewByName actor error ', err);
    } else {
      // console.log('************* in addImage tmdb crew id ', crew_id);
      tmdbHelper.getCrewImageById(crew_id, (err, crewObj) => {
        if (err) {
          console.log('********** getCrewImageById actor error ', err);
        } else if (crewObj === undefined || crewObj === null) {
          console.log('************ actor crewObj is undefined or null ', crewObj);
        } else {
          // console.log('************ in addImage ', crewObj);
          if (crewObj.profiles.length > 0) {
            // console.log('************* images_uri ', tmdb.images_uri);
            // console.log('************* file path ', crewObj.profiles[0].file_path);
            var crew_url = tmdb.images_uri + crewObj.profiles[0].file_path;
            // console.log('************ crew_url ', crew_url);
            // console.log('********** crewObj.id ', crew.id);
            models.Crew.where({ id: parseInt(crew.id) }).fetch()
              .then(crew => {
                return crew.save({image_url: crew_url}, {patch: true});
              })
              .then(crew => {
                // resolve(crew_record.attributes.id);
                // console.log('*********** crew after update ', crew);
                callback(null, crew.attributes.id);
              })
              .catch(err => {
                callback(err);
              });
          }
        }
      });
    }
  });
};

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
