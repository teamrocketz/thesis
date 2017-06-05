const db = require('../');

const Blacklist = db.Model.extend({
  tableName: 'blacklist',
});

module.exports = db.model('Blacklist', Blacklist);
