
exports.up = function (knex, Promise) {
  return Promise.all([
    // knex.schema.dropTable('auths'),
    // knex.schema.dropTable('awards'),
    // knex.schema.dropTable('crew'),
    // knex.schema.dropTable('genres'),
    // knex.schema.dropTable('movies'),
    // knex.schema.dropTable('transactions'),
    // knex.schema.dropTable('profiles'),
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
      table.jsonb('vod_subscriptions').nullable();
      table.boolean('new_user').defaultTo(true);
      // table.timestamps('stamp').nullable();
      //Payment Columns
      // table.string('payment_method').nullable();
      // table.bigInteger('CCN').nullable();
    }),

    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      // table.string('password', 100).nullable();
      // table.string('salt', 100).nullable();
      table.integer('profile_id');
      table.foreign('profile_id').references('profiles.id').onDelete('CASCADE');
    }),

    knex.schema.createTableIfNotExists('crew', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.jsonb('genre').nullable();
      table.jsonb('awards').nullable();
      table.boolean('actor').nullable();
      table.boolean('director').nullable();
      table.boolean('writer').nullable();
    }),

    knex.schema.createTableIfNotExists('movies', function(table) {
      table.increments('id').unsigned().primary();
      table.string('title').notNullable();
      table.integer('year').nullable();
      table.jsonb('release_date').nullable();
      table.jsonb('genre').nullable();
      table.jsonb('awards').nullable();
      table.jsonb('director').notNullable();
      table.jsonb('writer').notNullable();
      table.jsonb('actors').notNullable();
      table.bigInteger('box_office').nullable();
      table.string('production').nullable();
      table.jsonb('ratings').nullable();
    }),

    knex.schema.createTableIfNotExists('awards', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.integer('year').nullable();
      table.string('category').nullable();
      table.integer('crew').nullable();
      table.integer('movie').nullable();
      table.foreign('crew').references('id').inTable('crew').onDelete('CASCADE');
      table.foreign('movie').references('id').inTable('movies').onDelete('CASCADE');
    }),

    knex.schema.createTableIfNotExists('genres', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      // table.jsonb('movies').nullable();
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
    knex.schema.createTableIfNotExists('transactions', function(table) {
      table.increments('id').unsigned().primary(); //Transaction Number
      table.integer('user_id').notNullable();
      table.string('method').nullable();
      table.bigInteger('CCN').nullable();
      table.foreign('user_id').references('id').inTable('profiles');
      // table.foreign('CCN').references('CCN').inTable('profiles');
    }),

  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    // knex.schema.dropTable('auths'),
    // knex.schema.dropTable('awards'),
    // knex.schema.dropTable('crew'),
    // knex.schema.dropTable('genres'),
    // knex.schema.dropTable('movies'),
    // knex.schema.dropTable('transactions'),
    // knex.schema.dropTable('profiles')
  ]);
};
