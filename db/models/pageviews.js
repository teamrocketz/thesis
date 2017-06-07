const db = require('../');

const Pageview = db.Model.extend({
  tableName: 'pageviews',
  tags() {
    return this.hasMany(db.Tag);
  },
});

module.exports = db.model('Pageview', Pageview);
