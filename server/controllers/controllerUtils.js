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

module.exports.isBlacklistDuplicate = entry =>
  models.Blacklist.where(entry).orderBy('id').fetch()
  .then((result) => {
    console.log('entry being searched:', entry);
    console.log('the result is: ', result);
    if (!result || !result.attributes) {
      console.log('so we return false');
      return false;
    }
    console.log('so we return true');
    return true;
  })
  .catch((err) => {
    throw new Error(err);
  });

module.exports.isBlacklist = entry =>
  models.Blacklist.where(entry).orderBy('-time_open').fetch()
  .then((result) => {
    console.log('ENTRY FOR BLACKLIST: ', entry);
    console.log('RESULT FROM BLACKLIST SEARCH: ', result);
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
