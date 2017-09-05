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
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),

    knex.schema.createTableIfNotExists('genre', function(table) {
      table.increments('id').unsigned().primary();
      table.text('name').notNullable();
      table.text('movies').nullable();
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

    knex.schema.createTableIfNotExists('awards', function(table) {
      table.increments('id').unsigned().primary();
      table.text('name').notNullable();
      table.smallInteger('year').nullable();
      table.text('category').nullable();        
      table.jsonb('actor').nullable(); //change to FK       
    }),

    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments('id').unsigned().primary();
      table.text('first_name').notNullable();
      table.text('last_name').notNullable();
      table.text('display').nullable();
      table.text('avatar').nullable();
      table.text('email').nullable();        
      table.unique('email').notNullable();
      table.integer('phone').nullable();
      table.jsonb('favorites').nullable();
      table.jsonb('follow_genre').nullable();  
      table.jsonb('follow_actor').nullable();  
      table.jsonb('follow_director').nullable();
      table.jsonb('follow_movies').nullable();
      table.jsonb('follow_writers').nullable();
      table.boolean('first').defaultTo('True');
      table.timestamps('stamp').nullable();
    }),

    knex.schema.createTableIfNotExists('payment', function(table) {
      // table.increments('id').unsigned().primary();
      table.text('email').notNullable();
      table.text('method').nullable();
      table.bigInteger('CCN').nullable();        
    }),

  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles')
  ]);
};
