var mongoose = require('mongoose');
var searchTitle = require('../server/movieAPIHelpers/omdbHelpers.js').searchTitle;
var getTrailers = require('../server/movieAPIHelpers/tmdbHelpers.js').getTrailersById;
var getSimilarMovies = require('../server/movieAPIHelpers/tmdbHelpers.js').getSimilarMovies;
var uri = process.env.MONGODB_URI || 'mongodb://localhost/fetcher';
var ObjectId = require('mongodb').ObjectId;

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

var movieSchema = mongoose.Schema({
  id: { type: String, unique: true },
  title: String,
  year: { type: Number, required: true },
  release_date: { type: String, required: true },
  genre: { type: Array, required: true },
  runtime: { type: String, unique: true },
  directors: { type: Array, required: true },
  writers: { type: Array, required: true },
  actors: { type: Array, required: true },
  description: { type: String, unique: true },
  awards: { type: Array, required: true },
  poster: { type: String, required: true },
  ratings: { type: Array, required: true },
  language: Array,
  box_office: Number,
  production: String,
  website: { type: String, required: true },
  theater: Array,
  trailers: { type: Array, required: true },
  similar: Array
});

var Movie = mongoose.model('Movie', movieSchema, 'movies');

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
  console.log(idArray);
  if (idArray === null || idArray.length === 0) {
    cb(null, []);
  } else {
    var movieList = [];
    var len = idArray.length || 0;
    idArray.forEach((value, i) => {
      getMovies({ _id: ObjectId(value) }, (err, res) => {
        if (err) {
          cb(err, null);
        } else {
          movieList.push(res[0]);
        }
        if (movieList.length === len) {
          cb(null, movieList);
        }
      });
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
  movies.forEach((value) => {
    // console.log('the title is ', value.title);
    searchTitle(value.title, (err, data) => {
      data = JSON.parse(data.request.response.body);
      if (err) {
        console.log('brokeninsaveMovies');
      } else {
        // console.log(data);
        var searchid = data.Id;
        var posterurl = 'https://image.tmdb.org/t/p/w500' + value.poster_path;
        var id = data.imdbID;
        var similar;
        var trailers = [];
        Movie.find({ id: data.imdbID }, (err, res) => {
          if (res.length === 0) {
            getSimilarMovies(data.id, (err, similarmovies) => {
              if (err) {
                console.log('nosimilar');
              } else {
                similar = similarmovies;
                getTrailers(id, (err, res) => {
                  if (err) {
                    console.log('error');
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
                      box_office: data.Box_Office,
                      production: data.Production,
                      website: data.Website,
                      theater: data.Theater,
                      trailers: trailers,
                      similar: similarmovies
                    });
                    newMovie.save((err, res) => {
                      if (err) {
                        console.log('error');
                      } else {
                        console.log('success');
                      }
                    });
                  }
                });
              }

            });
          }

        });

      }

    });

  });

  cb();
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

module.exports.searchDb = searchDb;
module.exports.searchByTitle = searchByTitle;
module.exports.searchByIds = searchByIds;
module.exports.saveMovies = saveMovies;
module.exports.getMovies = getMovies;
