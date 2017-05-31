const db = require('../');

const Pageview = db.Model.extend({
  tableName: 'pageviews',
});

module.exports = db.model('Pageview', Pageview);
