const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();
var Promise = require('bluebird');

module.exports.verify = (req, res, next) => {

  Promise.resolve(req.isAuthenticated())
    .then( () => {
      if (req.isAuthenticated()) {
        console.log(req.body);
        next();
      }
        // console.log(res.body)
        res.redirect('/login');

    })
  };



module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: 'localhost',
    port: 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
