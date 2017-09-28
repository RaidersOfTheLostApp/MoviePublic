var mongoose = require('mongoose');
var searchTitle = require('../server/movieAPIHelpers/omdbHelpers.js').searchTitle;
var getTrailers = require('../server/movieAPIHelpers/tmdbHelpers.js').getTrailersById;
var getSimilarMovies = require('../server/movieAPIHelpers/tmdbHelpers.js').getSimilarMovies;
var pgAddMovie = require('../server/controllers/movies.js').addMovie;
var uri = process.env.MONGODB_URI || 'mongodb://localhost/fetcher';
var ObjectId = require('mongodb').ObjectId;
var pg = require('../db/sync');
const async = require('async');

mongoose.connect(uri, {
  useMongoClient: true
});

var searchDb = mongoose.connection;

searchDb.on('error', () => {
  console.log('mongoose connection error');
});

searchDb.once('open', () => {
  console.log('mongoose connected successfully');
});

var idSchema = mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  title: {type: String, required: true},
  release_date: {type: String, required: true},
  count: {type: Number, required: true},
  stored: {type: Boolean, require: true}
});

var movieSchema = mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  release_date: { type: String, required: true },
  genre: { type: Array, required: true },
  runtime: { type: String, unique: true },
  directors: { type: Array, required: true },
  writers: { type: Array, required: true },
  actors: { type: Array, required: true },
  description: { type: String, unique: true },
  awards: { type: Array, required: true },
  poster: { type: String, required: true, unique: true},
  ratings: { type: Array, required: true },
  language: Array,
  box_office: String,
  production: String,
  website: { type: String, required: true },
  theater: Array,
  trailers: { type: Array, required: true },
  count: Number
});

var Movie = mongoose.model('Movie', movieSchema, 'movies');
var Id = mongoose.model('Id', idSchema, 'id');

var searchByTitle = (title, cb) => {
  getMovies({ title: title }, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  });
};

var searchByIds = (idArray, cb) => {
  // console.log('*********** in searchByIds ', idArray);
  if (idArray === null || idArray.length === 0) {
    cb(null, []);
  } else {
    var movieList = [];
    var len = idArray.length;
    idArray.forEach((value, i) => {
      if (value.length > 20) {
        // console.log(value, '@@@@@%%%%%');
        getMovies({ _id: value }, (err, res) => {
          if (err) {
            cb(err, null);
          } else {
            movieList.push(res[0]);
          }
          if (movieList.length === len) {
            cb(null, movieList);
          }
        });
      } else {
        getMovies({ id: value }, (err, res) => {
          if (err) {
            cb(err, null);
          } else {
            movieList.push(res[0]);
          }
          if (movieList.length === len) {
            cb(null, movieList);
          }
        });
      }
    });
  }
};

var getMovies = (query, cb) => {
  Movie.find(query, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  });
};

var saveMovies = (movies, cb) => {
  if (!movies) {
    console.log('nomovies');
  } else {

    async.each(movies, (value) => {

      searchTitle(value.title, value.release_date, (err, data) => {
        if (err) {
          console.log(err, 'error in savemovies');
        }
        var year = value.release_date.slice(0, 4);
        // console.log(value.title, value.release_date, '@@@@@@@@@@');
        if (!data || data[0] === '<' || data[0] === 'I') {
          console.log('data is wierd');
        } else {
          data = JSON.parse(data);
          var searchid = data.Id;
          if (value.poster_path === 'N/A') {

          } else {
            var posterurl = 'https://image.tmdb.org/t/p/w500' + value.poster_path;
            var id = data.imdbID;
            var similar = [];
            var trailers = [];
            Movie.find({ id: data.imdbID }, (err, res) => {
              if (res.length === 0) {

                getTrailers(id, (err, res) => {
                  if (err) {
                    console.log('Error: getTrailers Search');
                  } else {
                    trailers = res;
                    var newMovie = new Movie({
                      id: id,
                      title: data.Title,
                      year: data.Year,
                      release_date: data.Released,
                      genre: data.Genre,
                      runtime: data.Runtime,
                      directors: data.Director,
                      writers: data.Writer,
                      actors: data.Actors,
                      description: data.Plot,
                      awards: data.Awards,
                      poster: data.Poster,
                      ratings: data.Ratings,
                      language: data.Language,
                      box_office: data.BoxOffice,
                      production: data.Production,
                      website: data.Website,
                      theater: data.Theater,
                      trailers: trailers,
                      count: 1
                    });
                    // console.log(newMovie, '!%!%!%')
                    newMovie.save((err, movieObj) => {
                      if (err) {
                        // console.log('MongoDB - Movie Add Error');
                        // console.log(err.name, 'MongoDB - Movie Add Error');
                      } else {
                        console.log('MongoDB - Movie Add Success');
                        // console.log('MongoDB - Movie Add Success');
                        pg.queueAdd('movie', movieObj);
                        // pgAddMovie(res, (err, results) => {
                        //   if (err) {
                        //     // console.log(err, 'Server Response - PG Unable to Add Movies');
                        //     // res.status(500).send('Postgres: Error adding movies');
                        //   } else {
                        //     // console.log(results, 'Server Response - PG Added Data');
                        //     // res.status(201).send('Server Response - PG Added Data');
                        //   }
                        // });
                      }
                    });
                  }
                });



              }

            });

          }

        }
      })

    });

    if (cb) { cb(); }
  }
};

var saveToId = (array, cb) => {

  async.each(array, (movie) => {
    findById(movie.id, (err, res) => {
      if (err) {
        console.log('savetoidbroken');
      } else {
        // console.log(res, '111')
        if (res.length === 0) {
          // console.log(movie, '@@@@@@')
          movie = new Id({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            count: 1,
            stored: false
          });
          movie.save((err, res) => {
            if (err) {
              console.log('savenotworking');
              cb(err, null);
            } else {
              cb(null, err);

            }
          });
          updateMovies();
        } else {
          // console.log(res[0].count, 'counting')
          Id.update({id: res[0].id}, { $set: {count: res[0].count + 1}}, (err, res) => {
            if (err) {
              cb(err, null);
            } else {
              cb(null, err);
              updateMovies();

            }
          });
        }
      }
    });
  });
};

var updateMovies = () => {
  Id.find({})
    .sort({count: -1})
    .limit(5000)
    .exec( (err, res) => {
      // console.log(res, 'IN UPDATE')
      saveMovies(res);
    });
};

var getidlist = (cb) => {
  Id.find({}, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  });
};

var findById = (id, cb) => {
  return Id.find({id: id}, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  });
};

// var saveFavorites = (req, res) => {
//   console.log('we made it to save favorites!');
//   models.Profile.where({ id: req.session.passport.user }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;a
//       }
//       var subs = [];
//       for (var key in req.body) {
//         if (req.body[key]) {
//           subs.push(req.body[key]);
//         }
//       }
//       return profile.save({favorites: JSON.stringify(subs)}, {patch: true});
//     })
//     .then(() => {
//       console.log('********* favorites have successfully been saved to DB');
//       res.sendStatus(201);
//     })
//     .error(err => {
//       console.log('********* error in saving favorites to DB', err);
//       res.status(500).send(err);
//     })
//     .catch((e) => {
//       console.log('********* catch in setFavorites', e);
//       res.sendStatus(404);
//     });
// };
module.exports.getidlist = getidlist;
module.exports.searchDb = searchDb;
module.exports.searchByTitle = searchByTitle;
module.exports.searchByIds = searchByIds;
module.exports.saveMovies = saveMovies;
module.exports.getMovies = getMovies;
module.exports.saveToId = saveToId;
