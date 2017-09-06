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
  year: Number,
  release_date: String,
  genre: Array,
  runtime: String,
  directors: Array,
  writers: Array,
  actors: Array,
  description: String,
  awards: Array,
  poster: String,
  ratings: Array,
  language: Array,
  box_office: Number,
  production: String,
  website: String,
  theater: Array
});

var Movie = mongoose.model('Movie', movieSchema, 'movies');

var searchByTitle = (title, cb) => {
  Movie.find({title: title}, cb)
}

var saveMovies = (movies, cb) => {
  movies.forEach( (value) => {
    var posterurl = 'https://image.tmdb.org/t/p/w500' + value.poster_path;
    var id = value.id;
    searchTitle(value.title, (err, data) => {
      if(err){
        console.log('brokeninsaveMovies')
      }
      data = JSON.parse(data.body);
      var newMovie = new Movie({
        id: id,
        title: data.Title,
        year: data.Year,
        release_date: data.Release_Date,
        genre: data.Genre,
        runtime: data.Runtime,
        directors: data.Directors,
        writers: data.Writers,
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
      })
      console.log(newMovie, '1234321')
      newMovie.save( (err, res) => {
        if(err){
          console.log('error')
        }else{
          console.log('success')
        }
      });

    })

    })


};

module.exports = searchDb;
module.exports.searchByTitle = searchByTitle;
module.exports.saveMovies = saveMovies;
