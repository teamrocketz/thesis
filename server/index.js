const app = require('./app');
const config = require('config');
const db = require('../db');

const PORT = config.webserver.port;

console.log('Server starting up.');
console.log(`NODE_ENV is set to ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === undefined) {
  console.log('  config module will use default \'development\' configs');
}

console.log(`Postgres URL set to ${db.url}`);

const sanitizedRedisUrl = config.redis.url.includes('@') ? `redis://${config.redis.url.match(/@(.*$)/)[1]}` : config.redis.url;
console.log(`Redis URL set to ${sanitizedRedisUrl}`);

app.listen(PORT, () => {
  console.log(`Hault server listening on port ${PORT}`);
});
