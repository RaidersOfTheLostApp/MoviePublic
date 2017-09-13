const client = require('../knexfile');

if (process.env.NODE_ENV === 'production') {
  'use strict';
  var URL = require('url-parse');
  var url = new URL(process.env.DATABASE_URL);
  // DATABASE_URL format: user:password#host:port/database

  const knex = require('knex')({
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
  });
} else {
  const knex = require('knex')(client);
}

const db = require('bookshelf')(knex);

db.plugin('registry');

module.exports = db;
