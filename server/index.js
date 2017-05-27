// 'use strict'; // commented out per eslint

const app = require('./app');

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});
