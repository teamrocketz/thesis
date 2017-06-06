/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const Promise = require('bluebird');

const createSeeder = require('knex-csv-seeder').default;

exports.seed = (knex, promiseConstructor) => {
  const seedTables = (tableNameArr) => {
    const createSeederForTable = tableName => (
      createSeeder({
        table: tableName,
        file: path.join(__dirname, `${tableName}.csv`),
      })
    );

    // delete all tables first, so that we get foreign key errors if we insert things
    // in the wrong order
    return tableNameArr.reduce((deleteChain, tableName) => (
      deleteChain.then(() => knex(tableName).del())
    ), Promise.resolve())
    .then(() => {
      // now seed each table from its .csv file
      const seeders = tableNameArr.map(tableName => createSeederForTable(tableName));
      return seeders.reduce((seedChain, seeder) => (
        seedChain.then(() => seeder(knex, promiseConstructor))
      ), Promise.resolve());
    });
  };

  // order is important due to foreign key constraints
  return seedTables([
    'profiles',
    'auths',
    'pageviews',
  ]);
};
