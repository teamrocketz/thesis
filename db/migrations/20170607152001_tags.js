
exports.up = function upFunc(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('tags', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name', 64).notNullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('pageview_id').references('pageviews.id').onDelete('CASCADE');
    }),
  ]);
};

exports.down = function downFunc(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tags'),
  ]);
};
