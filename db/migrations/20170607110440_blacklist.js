
exports.up = function upFunc(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('blacklist', (table) => {
      table.increments('id').unsigned().primary();
      table.string('domain', 100).notNullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
  ]);
};

exports.down = function downFunc(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('blacklist'),
  ]);
};
