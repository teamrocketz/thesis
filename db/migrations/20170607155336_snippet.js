
exports.up = function upFunc(knex) {
  return knex.schema.hasColumn('pageviews', 'snippet')
    .then((exists) => {
      if (!exists) {
        return knex.schema.table('pageviews', (table) => {
          table.string('snippet', 1000).nullable();
        });
      }
      return undefined;
    });
};

exports.down = function downFunc(knex) {
  return knex.schema.table('pageviews', (table) => {
    table.dropColumn('snippet');
  });
};
