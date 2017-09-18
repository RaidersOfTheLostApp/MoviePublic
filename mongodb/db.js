var mongoose = require('mongoose');
var searchTitle = require('../server/movieAPIHelpers/omdbHelpers.js').searchTitle;
var getTrailers = require('../server/movieAPIHelpers/tmdbHelpers.js').getTrailersById;
var getSimilarMovies = require('../server/movieAPIHelpers/tmdbHelpers.js').getSimilarMovies;
var pgAddMovie = require('../server/controllers/movies.js').addMovie;
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
  box_office: String,
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
  // console.log('*********** in searchByIds ', idArray);
  if (idArray === null || idArray.length === 0) {
    cb(null, []);
  } else {
    var movieList = [];
    var len = idArray.length;
    idArray.forEach((value, i) => {
       if (value.length > 20) {
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
  if (movies) {
    movies.forEach((value) => {
      // console.log('the title is ', value.title);
      searchTitle(value.title, (err, data) => {
        data = JSON.parse(data.request.response.body);
        if (err) {
          console.log('brokeninsaveMovies');
        } else {
          // console.log(data, 'MongoDB - Data Variable');
          var searchid = data.Id;
          var posterurl = 'https://image.tmdb.org/t/p/w500' + value.poster_path;
          var id = data.imdbID;
          var similar;
          var trailers = [];
          Movie.find({ id: data.imdbID }, (err, res) => {
            if (res.length === 0) {
              getSimilarMovies(data.id, (err, similarMovies) => {
                if (err) {
                  console.log('Error: No Similar Movies');
                } else {
                  similar = similarMovies;
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
                        similar: similarMovies
                      });
                      newMovie.save((err, res) => {
                        if (err) {
                          // console.log(err, 'MongoDB - Movie Add Error');
                          console.log(err.name, 'MongoDB - Movie Add Error');
                        } else {
                          console.log(res, 'MongoDB - Movie Add Success');
                          // console.log('MongoDB - Movie Add Success');

                          pgAddMovie(res, (err, results) => {
                            if (err) {
                              console.log(err, 'Server Response - PG Unable to Add Movies');
                              // res.status(500).send('Postgres: Error adding movies');
                            } else {
                              console.log(results, 'Server Response - PG Added Data');
                              // res.status(201).send('Server Response - PG Added Data');

                              //res includes full object
                              //get actor and director images
                              //loop on 'actors' and 'directors' fields of _id
                              //create new field for actor_image & director_image with format [{actor: '<name>', photo: '<url>'},..]

                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          }); //End Movie.find
        } //End Else Statement
      }); //Close search Title
    }); //End forEach
    cb();
  } else {
    console.log(movies, 'MongoDB: No Movies Given');
  }
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
