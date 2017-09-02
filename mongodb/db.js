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

module.exports = searchDb;
module.exports.searchByTitle = searchByTitle;
