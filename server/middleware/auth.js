const session = require('express-session');
const config = require('config')['redis'];
const RedisStore = require('connect-redis')(session);
const searchDb = require('../../mongodb/db.js');
var Promise = require('bluebird');

if (process.env.NODE_ENV !== 'development') {
  // process.env.NODE_ENV = 'development';
  const redisClient = require('redis').createClient(process.env.REDIS_URL);
  var redisStoreClient = {
    url: process.env.REDIS_URL
  };
  var newRedis = new RedisStore(redisStoreClient);
}else {
  const redisClient = require('redis').createClient();
  var redisStoreClient = {
    client: redisClient,
    host: 'localhost',
    port: 6379
  };
  var newRedis = new RedisStore(redisStoreClient);
}

module.exports.verify = (req, res, next) => {

  Promise.resolve(req.isAuthenticated())
    .then( () => {
      if (req.isAuthenticated()) {
        // console.log(req.body);
        next();
      } else {
        res.redirect('/login');
      }
      // console.log(res.body)
    });
};

module.exports.getMoviesFromMongo = (req, res, next) => {
  console.log(req.body);
  next();
};

module.exports.session = session({
  store: newRedis,
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
