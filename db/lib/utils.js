'use strict';
var URL = require('url-parse');
var client;

if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
  var url = new URL(process.env.DATABASE_URL);
  // DATABASE_URL format: user:password#host:port/database
  client = {
    client: 'postgresql',
    connection: {
      host: url.hostname,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      port: url.port
    },
    debug: false,
    pool: {min: 2, max: 10}
  };
} else {
  client = require('../knexfile');
}

const knex = require('knex')(client);

exports.rollbackMigrate = (done) => {
  knex.migrate.rollback()
    .then(function () {
      return knex.migrate.latest();
    })
    .then(function () {
      return knex.seed.run();
    })
    .then(function () {
      done();
    })
    .catch(function (err) {
      console.log('error in migration:', err);
      done();
    });
};

exports.rollback = (done) => {
  knex.migrate.rollback()
    .then(function () {
      done();
    })
    .catch(function (err) {
      console.log('err in migration afterEach');
      done();
    });
};
