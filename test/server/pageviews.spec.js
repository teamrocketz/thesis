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
      return agent.get('/pageviews')
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.lengthOf(testerPageviews.length);
        });
    });

    it('returns pageviews in descending chronological order', function () {
      const sortedPageviews = [...testerPageviews];
      sortedPageviews.sort((a, b) => (b.id - a.id));

      return agent.get('/pageviews')
        .expect(200)
        .then((res) => {
          const areProperlyOrdered = res.body.every((pageview, index) => (
            pageview.id === sortedPageviews[index].id
          ));
          expect(areProperlyOrdered).to.be.true();
        });
    });

    it('limits pageview retrieval to the specified number of records', function () {
      const numResults = 5;

      return agent.get('/pageviews')
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.be.above(numResults);
          return agent.get('/pageviews')
            .query({ numResults })
            .expect(200);
        })
        .then((res) => {
          expect(res.body).to.have.lengthOf(numResults);
        });
    });

    it('can retrieve pageviews within a specified id range', function () {
      let minId = null;
      let maxId = null;

      return agent.get('/pageviews').expect(200)
        .then((res) => {
          minId = res.body[res.body.length - 1].id + 1;
          maxId = res.body[0].id - 1;
          return agent.get('/pageviews')
            .query({ minId, maxId });
        })
        .then((res) => {
          expect(res.body[res.body.length - 1].id).to.be.at.least(minId);
          expect(res.body[0].id).to.be.at.most(maxId);
        });
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
