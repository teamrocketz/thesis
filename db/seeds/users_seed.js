const models = require('../models');

exports.seed = function seedFunc() {
  return models.Profile.forge({
    id: 99999,
    first: 'Tester',
    last: 'Admin',
    display: 'Administrator',
    email: 'tester@domain.com',
  }).save(null, { method: 'insert' })
  .error(() => {
    console.error('ERROR: failed to create auth');
  })
  .catch((err) => {
    console.log('here is error: ', err);
  });
};

