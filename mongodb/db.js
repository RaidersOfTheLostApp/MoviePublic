var mongoose = require('mongoose');
var searchTitle = require('../server/movieAPIHelpers/omdbHelpers.js').searchTitle;
var uri = process.env.MONGODB_URI || 'mongodb://localhost/fetcher';

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
  id: Number,
  title: String,
  year: {type: Number, required: true},
  release_date: {type: String, required: true},
  genre: {type: Array, required: true},
  runtime: String,
  directors: {type: Array, required: true},
  writers: {type: Array, required: true},
  actors: {type: Array, required: true},
  description: String,
  awards: Array,
  poster: String,
  ratings: Array,
  language: Array,
  box_office: Number,
  production: String,
  website: {type: String, required: true},
  theater: Array
});

var Movie = mongoose.model('Movie', movieSchema, 'movies');

var searchByTitle = (title, cb) => {

  getMovies({title: title}, (err, res) => {
    if(err){
      cb(err, null)
    }else{
      cb(null, res)
    }
  })
};

var getMovies = (query, cb) => {
  Movie.find (query, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      // console.log(res, 'indb')
      cb(null, res);
    }
  });
};

var saveMovies = (movies, cb) => {
  // console.log(movies, '@@@@@|')
  movies.forEach( (value) => {
    // console.log(value, '@@@')
        // console.log(res, '@@@@@@@@@@@@@@@@@@@@@@@@@')
        var posterurl = 'https://image.tmdb.org/t/p/w500' + value.poster_path;
        var id = value.id;

        searchTitle(value.title, (err, data) => {
          // console.log(err, data.request.response.body, '@#$@#$@#$#@')
          data = JSON.parse(data.request.response.body);

          if (err) {
            console.log('brokeninsaveMovies');
          }else{
            Movie.find({title: value.title}, (err, res) => {
              // console.log(data, '@@@@@@@@@@@')
              if(res.length === 0){
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
                  description: data.Description,
                  awards: data.Awards,
                  poster: posterurl,
                  ratings: data.Ratings,
                  language: data.Language,
                  box_office: data.Box_Office,
                  production: data.Production,
                  website: data.Website,
                  theater: data.Theater
                });
                // console.log(newMovie, '1234321');
                newMovie.save( (err, res) => {
                  if (err) {
                    console.log('error');
                  } else {
                    console.log('success');
                  }
                });

              }

            })


          }



    });
  });
  cb();
};

module.exports = searchDb;
module.exports.searchByTitle = searchByTitle;
module.exports.saveMovies = saveMovies;
module.exports.getMovies = getMovies;
