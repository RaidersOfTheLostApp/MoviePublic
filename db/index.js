'use strict';
var URL = require('url-parse');
var client;

if (process.env.NODE_ENV !== 'development') {
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

const db = require('bookshelf')(knex);

db.plugin('registry');

module.exports = db;
