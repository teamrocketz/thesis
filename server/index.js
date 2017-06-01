// 'use strict'; // commented out per eslint

const app = require('./app');
const config = require('config');

const PORT = config.webserver.port;

console.log('Server starting up.');
console.log(`NODE_ENV is set to ${process.env.NODE_ENV}`);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
