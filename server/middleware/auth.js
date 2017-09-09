const session = require('express-session');
const config = require('config')['redis'];
const RedisStore = require('connect-redis')(session);
const Redis = require('ioredis');
const searchDb = require('../../mongodb/db.js');
var Promise = require('bluebird');

if (process.env.NODE_ENV === 'production') {
  const redisClient = require('redis').createClient(config.REDIS_URL);
  var newRedis = new Redis(config.REDIS_URL);
  var redisStoreClient = {
    url: config.REDIS_URL
  };
} else {
  const redisClient = require('redis').createClient();
  var newRedis = new RedisStore(redisStoreClient);
  var redisStoreClient = {
    client: redisClient,
    host: 'localhost',
    port: 6379
  };
}

// console.log('************ env ', process.env.NODE_ENV);
// console.log('************* newRedis ', newRedis);

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
