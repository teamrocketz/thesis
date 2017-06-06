const models = require('../../db/models');

module.exports.isDuplicate = entry =>
  models.Pageview.where(entry).orderBy('-time_open').fetch()
  .then((result) => {
    if (!result || !result.attributes) {
      return false;
    }
    const x = new Date(result.attributes.time_open).getTime();
    const y = new Date().getTime();
    if (y - x > 20000) {
      return false;
    }
    return true;
  })
  .catch((err) => {
    throw new Error(err);
  });

module.exports.hasSnippet = entry =>
  models.Pageview.where(entry).orderBy('-time_open').fetch()
  .then((result) => {
    if (result.attributes.snippet !== '') {
      return true;
    }
    if (!result || !result.attributes) {
      throw new Error('No entry found in database');
    }
    return false;
  })
  .catch((err) => {
    throw new Error(err);
  });
