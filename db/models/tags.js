const db = require('../');

const Tag = db.Model.extend({
  tableName: 'tags',
  pageview() {
    return this.belongsTo('Pageview');
  },
});

module.exports = db.model('Tag', Tag);
