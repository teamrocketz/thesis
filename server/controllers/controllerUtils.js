const models = require('../../db/models');

module.exports.isDuplicate = (entry) => {
  models.Pageview.where(entry).fetch()
  .then((result) => {
    if (!result || !result.attributes) {
      console.log('UTILITIES: idk');
      return false;
    }
    const x = new Date(result.attributes.time_open).getTime();
    const y = new Date().getTime();
    const z = y - x;
    if (z > 1200) {
      console.log('UTILITIES: you can add this one!: ', z);
      return false;
    }
    console.log('UTILITIES: duplicate entry from utilities');
    return true;
  })
  .catch((err) => {
    console.log('UTILITIES: ', err);
  });
};
