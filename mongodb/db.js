var mongoose = require('mongoose');
var uri = process.env.MONGODB_URI || 'mongodb://localhost/fetcher';
mongoose.connect(uri, {
  useMongoClient: true
});

var db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});



var movieSchema = mongoose.Schema({

})
var userSchema = mongoose.Schema({
  userName: String,
  id: Number,
  hashPass: String,
  salt: String,
  voteCount: Number
});

var imageSchema = mongoose.Schema({
  id: String,
  userId: Number,
  imageUrl: String,
  caption: String,
  geoLocation: {type:[Number], index:'2d sphere'},
  tags: Array,
  timeStamp: Number,
  comments: Array,
  likeCount: Number,
  dislikeCount: Number
});

var Movie = mongoose.model('Movie', movieSchema, 'movies');
