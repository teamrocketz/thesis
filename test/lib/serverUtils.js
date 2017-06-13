const request = require('supertest');

const app = require('../../server/app');
const dbUtils = require('./dbUtils');

// input: email of an account in the seed data to log in
// assumes password is "password[firstName]"
//
// returns a Promise
// Promise results are a supertest agent with a logged in session
//
function getAuthenticatedAgent(email = 'tester@domain.com') {
  // const profileData = dbUtils.readCsv('profiles');
  const firstName =
    dbUtils.readCsv('profiles')
    .find(profile => profile.email === email)
    .first.toLowerCase();
  const password = `password${firstName}`;

  const agent = request.agent(app);
  return agent
    .post('/login')
    .send({ email, password })
    .expect(302)
    .expect('Location', '/')
    .then(() => (
      agent
    ));
}

module.exports.getAuthenticatedAgent = getAuthenticatedAgent;
