const config = require('config');
const username = require('username');

const parseUrl = (url) => {
  const configArr = url.match(/^postgres:\/\/(\w+):(\w+)@([^:]+):([0-9]+)\/(\w+)$/);

  return {
    user: configArr[1],
    password: configArr[2],
    host: configArr[3],
    port: configArr[4],
    database: configArr[5],
  };
};

if (config.knex.connection.url) {
  // URL was supplied as an environment variable
  Object.assign(config.knex.connection, parseUrl(config.knex.connection.url));
} else {
  // no environment variable, use connection info from config files
  if (config.knex.connection.user === '$USERNAME') {
    config.knex.connection.user = username.sync();
  }
  Object.assign(config.knex.connection, {
    url: `postgres://${config.knex.connection.user}:${config.knex.connection.password}@${config.knex.connection.host}${config.knex.connection.port ? `:${config.knex.connection.port}` : ''}/${config.knex.connection.database}`,
  });
}

const sanitizedUrl = config.knex.connection.url.includes('@') ? `postgres://${config.knex.connection.url.match(/@(.*$)/)[1]}` : config.knex.connection.url;

module.exports = config.knex;
module.exports.databaseUrl = sanitizedUrl;
