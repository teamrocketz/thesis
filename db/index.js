const knexfile = require('../knexfile');
const knex = require('knex')(knexfile);
const db = require('bookshelf')(knex);

db.plugin('registry');

module.exports = db;
module.exports.url = knexfile.databaseUrl;

