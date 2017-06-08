/* eslint-disable func-names, prefer-arrow-callback */

const Pageview = require('../../db/models/pageviews.js');
const dbUtils = require('../lib/dbUtils.js');

const chai = require('chai');
const dirtyChai = require('dirty-chai');

const expect = chai.expect;
chai.use(dirtyChai);

describe('/pageviews API', function () {
  let expected;

  before(function () {
    expected = dbUtils.readCsv('pageviews');
  });

  beforeEach(function (done) {
    dbUtils.reinitialize(done);
  });

  xdescribe('/', function () {
    it('retrieves a user\'s pageviews', function (done) {
      Pageview.forge().fetchAll()
        .then(function (results) {
          expect(results.length).to.equal(expected.length);
          expect(results.at(0).get('id')).to.equal(expected[0].id);
          done();
        })
        .catch(function (err) {
          done(err);
        });
      done();
    });

    it('limits pageview retrieval to the specified number of records', function (done) {
      done();
    });

    it('can start pageview retrieval past a specified database id', function (done) {
      // test > AND 'not ='
      done();
    });
  });

  xdescribe('/active', function () {
    it('retrieves a user\'s active pageviews', function (done) {
      done();
    });
  });

  xdescribe('/search', function () {
    it('finds pageviews based on their title', function (done) {
      done();
    });

    it('finds pageviews based on their snippet', function (done) {
      done();
    });

    it('finds matches based on variations of a word', function (done) {
      done();
    });

    it('prioritizes title search results higher than snippet search results', function (done) {
      done();
    });
  });

  xdescribe('/visitpage', function () {
    it('creates a new pageview record', function (done) {
      done();
    });

    it('doesn\'t create a new pageview record if visiting the same site within 20 seconds', function (done) {
      done();
    });

    it('does create a new pageview record if visiting the same site after 20 seconds', function (done) {
      done();
    });
  });

  xdescribe('/deactivate', function () {
    it('properly updates is_active', function (done) {
      done();
    });

    it('properly updates time_closed', function (done) {
      done();
    });

    it('properly updates snippet', function (done) {
      done();
    });
  });

  xdescribe('/delete', function () {
    it('deletes a page', function (done) {
    //   const profileId = 100000;
    //   // make sure it exists first
    //   Pageview.where({ id: profileId }).fetch()
    //     .then(function (result) {
    //       if (result === null) {
    //         throw new Error('profile was not in database');
    //       }
    //       return Pageview.where({ id: profileId }).destroy();
    //     })
    //     .then(function () {
    //       return Pageview.where({ id: 1 }).fetch();
    //     })
    //     .then(function (result) {
    //       expect(result).to.equal(null);
    //       done();
    //     })
    //     .catch(function (err) {
    //       done(err);
    //     });
    // });
      done();
    });
  });
});
