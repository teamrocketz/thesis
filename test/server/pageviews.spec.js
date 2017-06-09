/* eslint-disable func-names, prefer-arrow-callback */

const dbUtils = require('../lib/dbUtils.js');
const serverUtils = require('../lib/serverUtils.js');

const chai = require('chai');
const dirtyChai = require('dirty-chai');

const expect = chai.expect;
chai.use(dirtyChai);

describe('/pageviews API', function () {
  let testerProfile;
  let testerPageviews;
  let agent;

  before(function () {
    const profileData = dbUtils.readCsv('profiles');
    const pageviewData = dbUtils.readCsv('pageviews');

    testerProfile = profileData.find(profile => profile.email === 'tester@domain.com');
    testerPageviews = pageviewData.filter(pageview => pageview.profile_id === testerProfile.id);

    return serverUtils.getAuthenticatedAgent(testerProfile.email)
      .then((newAgent) => {
        agent = newAgent;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  beforeEach(function () {
    return dbUtils.reinitialize();
  });

  describe('/', function () {
    it('retrieves a user\'s pageviews', function () {
      return agent
        .get('/pageviews')
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.lengthOf(testerPageviews.length);
        });
    });

    xit('limits pageview retrieval to the specified number of records', function () {
    });

    xit('can start pageview retrieval past a specified database id', function () {
      // test > AND 'not ='
    });
  });

  xdescribe('/active', function () {
    it('retrieves a user\'s active pageviews', function () {
    });
  });

  xdescribe('/search', function () {
    it('finds pageviews based on their title', function () {
    });

    it('finds pageviews based on their snippet', function () {
    });

    it('finds matches based on variations of a word', function () {
    });

    it('prioritizes title search results higher than snippet search results', function () {
    });
  });

  xdescribe('/visitpage', function () {
    it('creates a new pageview record', function () {
    });

    it('doesn\'t create a new pageview record if visiting the same site within 20 seconds', function () {
    });

    it('does create a new pageview record if visiting the same site after 20 seconds', function () {
    });
  });

  xdescribe('/deactivate', function () {
    it('properly updates is_active', function () {
    });

    it('properly updates time_closed', function () {
    });

    it('properly updates snippet', function () {
    });
  });

  xdescribe('/delete', function () {
    it('deletes a page', function () {
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
    //     })
    //     .catch(function (err) {
    //       done(err);
    //     });
    // });
    });
  });
});
