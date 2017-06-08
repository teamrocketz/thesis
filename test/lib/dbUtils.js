const fs = require('fs');
const knex = require('knex')(require('../../knexfile'));
const path = require('path');

exports.reinitialize = (done) => {
  knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log('error in migration:', err);
      done();
    });
};

exports.wipe = (done) => {
  knex.migrate.rollback()
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
};

// read the contents of a seed CSV into an array of objects
// array = 1 row
// each object's keys corresponds to column names
exports.readCsv = (tableName) => {
  const parseField = (str) => {
    if ((str.length >= 2) && (str[0] === '"') && (str[str.length - 1] === '"')) {
      // "string"
      return str.slice(1, -1);
    } else if (str.match(/^\d+$/)) {
      // 12345
      return parseInt(str, 10);
    } else if (str === 'TRUE') {
      return true;
    } else if (str === 'FALSE') {
      return false;
    } else if (str === 'NULL') {
      return null;
    }
    throw new Error();
  };

  // read lines of file into array, removing newline at end if present
  const filename = path.join(__dirname, '../seeds', `${tableName}.csv`);
  const csv = fs.readFileSync(filename, 'utf8').split('\n');
  if (csv[csv.length - 1] === '') {
    csv.pop();
  }

  // parse lines into data structure
  const columns = csv[0].split(',').map(column => parseField(column));
  const data = csv.slice(1).map(rowStr => (
    rowStr.split(',').reduce((rowObj, field, index) => (
      Object.assign(rowObj, { [columns[index]]: parseField(field) })
    ), {})
  ));

  return data;
};

