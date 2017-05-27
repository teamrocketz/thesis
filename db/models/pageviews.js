const db = require('../');

const Pageview = db.Model.extend({
  tableName: 'pageview',
});

module.exports = db.model('Pageview', Pageview);
