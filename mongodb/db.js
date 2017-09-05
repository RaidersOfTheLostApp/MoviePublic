var mongoose = require('mongoose');
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
    var newMovie = new Movie({
      id: value.id,
      title: value.title,
      year: value.year,
      release_date: value.release_date,
      genre: value.genre,
      runtime: value.runtime,
      directors: value.directors,
      writers: value.writers,
      actors: value.actors,
      description: value.description,
      awards: value.awards,
      poster: value.post,
      ratings: value.ratings,
      language: value.language,
      box_office: value.box_office,
      production: value.production,
      website: value.website,
      theater: value.theater
    })

  })
}

module.exports = searchDb;
module.exports.searchByTitle = searchByTitle;
