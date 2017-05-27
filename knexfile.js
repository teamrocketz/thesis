const config = require('config');

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
  Object.assign(config.knex.connection, parseUrl(config.knex.connection.url));
} else {
  Object.assign(config.knex.connection, {
    url: `postgres://${config.knex.connection.user}:${config.knex.connection.password}@${config.knex.connection.host}${config.knex.connection.port ? `:${config.knex.connection.port}` : ''}/${config.knex.connection.database}`,
  });
}

const sanitizedUrl = config.knex.connection.url.includes('@') ? `redis://${config.knex.connection.url.match(/@(.*$)/)[1]}` : config.knex.connection.url;
console.log(`Using Postgres database at ${sanitizedUrl}`);

module.exports = config.knex;
