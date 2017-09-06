/**
* Establishing Schema
* http://knexjs.org/#Schema
*/

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('avatar').nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
      table.jsonb('favorites').nullable();
      table.jsonb('follow_genre').nullable();
      table.jsonb('follow_actor').nullable();
      table.jsonb('follow_director').nullable();
      table.jsonb('follow_movies').nullable();
      table.jsonb('follow_writers').nullable();
      table.boolean('new_user').defaultTo('true');
      table.timestamps('stamp').nullable();
      //Payment Columns
      table.text('payment_method').nullable();
      table.bigInteger('CCN').nullable();
    }),

    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),

    knex.schema.createTableIfNotExists('awards', function(table) {
      table.increments('id').unsigned().primary();
      table.text('name').notNullable();
      table.smallInteger('year').nullable();
      table.text('category').nullable();
      table.foreign('crew').references('id').inTable('crew').onDelete('CASCADE');
      table.foreign('movie').references('id').inTable('movies').onDelete('CASCADE');
    }),

    knex.schema.createTableIfNotExists('crew', function(table) {
      table.increments('id').unsigned().primary();
      table.text('name').notNullable();
      table.jsonb('genre').nullable();
      table.jsonb('awards').nullable();
      table.boolean('actor').nullable();
      table.boolean('director').nullable();
      table.boolean('writer').nullable();
    }),

    knex.schema.createTableIfNotExists('genre', function(table) {
      table.increments('id').unsigned().primary();
      table.text('name').notNullable();
      table.jsonb('movies').nullable();
    }),

    knex.schema.createTableIfNotExists('movies', function(table) {
      table.increments('id').unsigned().primary();
      table.text('title').notNullable();
      table.smallInteger('year').nullable();
      table.jsonb('release_date').nullable();
      table.jsonb('genre').nullable();
      table.jsonb('awards').nullable();
      table.jsonb('director').notNullable();
      table.jsonb('writer').notNullable();
      table.jsonb('actors').notNullable();
      table.bigInteger('box_office').nullable();
      table.text('production').nullable();
      table.jsonb('ratings').nullable();
    }),

    // knex.schema.createTableIfNotExists('users', function(table) {
    //   table.increments('id').unsigned().primary();
    //   table.text('first_name').notNullable();
    //   table.text('last_name').notNullable();
    //   table.text('display').nullable();
    //   table.text('avatar').nullable();
    //   table.text('email').nullable();
    //   table.unique('email').notNullable();
    //   table.integer('phone').nullable();
    //   table.jsonb('favorites').nullable();
    //   table.jsonb('follow_genre').nullable();
    //   table.jsonb('follow_actor').nullable();
    //   table.jsonb('follow_director').nullable();
    //   table.jsonb('follow_movies').nullable();
    //   table.jsonb('follow_writers').nullable();
    //   table.boolean('new_user').defaultTo('True');
    //   table.timestamps('stamp').nullable();
    //   //Payment Columns
    //   table.text('payment_method').nullable();
    //   table.bigInteger('CCN').nullable();
    // }),

    //Possible Table for Transactions
    knex.schema.createTableIfNotExists('transaction', function(table) {
      table.increments('id').unsigned().primary(); //Transaction Number
      table.text('email').notNullable();
      table.foreign('method').references('payment_method').inTable('users');
      table.bigInteger('CCN').references('CCN').inTable('users');
    }),

  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('awards'),
    knex.schema.dropTable('crew'),
    knex.schema.dropTable('genre'),
    knex.schema.dropTable('movies'),
    knex.schema.dropTable('transaction')
  ]);
};
