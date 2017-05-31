
exports.up = function upFunc(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', (table) => {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', (table) => {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('pageviews', (table) => {
      table.increments('id').unsigned().primary();
      table.string('url', 1000).notNullable();
      table.string('title', 500).notNullable();
      table.dateTime('time_open').notNullable();
      table.dateTime('time_closed').nullable();
      table.boolean('is_active').notNullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
  ]);
};

exports.down = function downFunc(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('profiles'),
    knex.schema.dropTable('pageviews'),
  ]);
};
