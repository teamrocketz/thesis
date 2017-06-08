/* eslint-disable func-names, prefer-arrow-callback */

const httpMocks = require('node-mocks-http');
const dbUtils = require('../lib/dbUtils.js');
const passport = require('../../server/middleware/passport');
const models = require('../../db/models');

const app = require('../../server/app');
const request = require('supertest');

const chai = require('chai');
const dirtyChai = require('dirty-chai');

const expect = chai.expect;
chai.use(dirtyChai);

describe('Authentication', function () {
  const fakeFlash = function (key, message) {
    const object = {};
    object[key] = message;
    return object;
  };

  let profileData;

  beforeEach(function (done) {
    profileData = dbUtils.readCsv('profiles');
    dbUtils.reinitialize(done);
  });

  describe('Passport', function () {
    describe('local-login strategy', function () {
      it('passport passes user if email and password match', function (done) {
        const httpRequest = httpMocks.createRequest({
          body: {
            email: 'tester@domain.com',
            password: 'passwordtester',
          },
        });
        httpRequest.flash = fakeFlash;
        const httpResponse = httpMocks.createResponse();
        models.Profile.where({ email: 'tester@domain.com' }).fetch()
          .then((profile) => {
            passport.authenticate('local-login', {}, (err, user) => {
              expect(user).to.be.an('object');
              expect(user.id).to.equal(profile.get('id'));
              expect(user.email).to.equal(profile.get('email'));
              done(err);
            })(httpRequest, httpResponse);
          });
      });

      it('passport passes false if email and password do not match', function (done) {
        const httpRequest = httpMocks.createRequest({
          body: {
            email: 'tester@domain.com',
            password: 'incorrect',
          },
        });
        httpRequest.flash = fakeFlash;
        const httpResponse = httpMocks.createResponse();
        passport.authenticate('local-login', {}, (err, user) => {
          expect(user).to.equal(false);
          expect(err).to.be.null();
          done(err);
        })(httpRequest, httpResponse);
      });
    });

    describe('Passport local-signup strategy', function () {
      it('passport passes false if email already exists', function (done) {
        const httpRequest = httpMocks.createRequest({
          body: {
            email: 'tester@domain.com',
            password: 'password123',
          },
        });
        httpRequest.flash = fakeFlash;
        const httpResponse = httpMocks.createResponse();
        passport.authenticate('local-signup', {}, (err, user, info) => {
          expect(user).to.be.equal(false);
          expect(info.signupMessage).to.equal('An account with this email address already exists.');
          done(err);
        })(httpRequest, httpResponse);
      });

      it('passport passes user if email does not already exist', function (done) {
        const httpRequest = httpMocks.createRequest({
          body: {
            email: 'TestUser4@mail.com',
            password: '101112',
          },
        });
        httpRequest.flash = fakeFlash;
        const httpResponse = httpMocks.createResponse();
        passport.authenticate('local-signup', {}, (err, user) => {
          models.Profile.where({ email: 'TestUser4@mail.com' }).fetch()
            .then((profile) => {
              expect(user).to.be.an('object');
              expect(user.id).to.equal(profile.get('id'));
              expect(user.email).to.equal(profile.get('email'));
              done(err);
            });
        })(httpRequest, httpResponse);
      });
    });
  });

  describe('server APIs', function () {
    it('redirect logged out users to the login page when they try accessing a secure URL', function () {
      return request(app)
        .get('/pageviews')
        .expect(302);
    });

    describe('/login', function () {
      it('logs in a user that provides valid credentials', function () {
        const agent = request.agent(app);
        return agent
          .post('/login')
          .send({ email: profileData[0].email, password: 'passwordtester' })
          .expect(302)
          .expect('Location', '/')
          .then(() => (
            agent.get('/pageviews').expect(200)
          ));
      });

      it('redirects a user that provides invalid credentials', function () {
        return request(app)
          .post('/login')
          .send({ email: profileData[0].email, password: 'invalid' })
          .expect(302);
      });
    });
  });
});
