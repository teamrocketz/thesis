/* eslint-disable func-names, prefer-arrow-callback */

const httpMocks = require('node-mocks-http');
const dbUtils = require('../../db/lib/utils.js');
const passport = require('../../server/middleware/passport');
const models = require('../../db/models');

const chai = require('chai');
const dirtyChai = require('dirty-chai');

const expect = chai.expect;
chai.use(dirtyChai);

describe('Authentication: Passport-to-database tests', function () {
  const fakeFlash = function (key, message) {
    const object = {};
    object[key] = message;
    return object;
  };

  beforeEach(function (done) {
    dbUtils.reinitialize(done);
  });

  describe('Passport local-login strategy', function () {
    it('passport passes user if email and password match', function (done) {
      const request = httpMocks.createRequest({
        body: {
          email: 'tester@domain.com',
          password: 'passwordtester',
        },
      });
      request.flash = fakeFlash;
      const response = httpMocks.createResponse();
      models.Profile.where({ email: 'tester@domain.com' }).fetch()
        .then((profile) => {
          passport.authenticate('local-login', {}, (err, user) => {
            expect(user).to.be.an('object');
            expect(user.id).to.equal(profile.get('id'));
            expect(user.email).to.equal(profile.get('email'));
            done(err);
          })(request, response);
        });
    });

    it('passport passes false if email and password do not match', function (done) {
      const request = httpMocks.createRequest({
        body: {
          email: 'tester@domain.com',
          password: 'incorrect',
        },
      });
      request.flash = fakeFlash;
      const response = httpMocks.createResponse();
      passport.authenticate('local-login', {}, (err, user) => {
        expect(user).to.equal(false);
        expect(err).to.be.null();
        done(err);
      })(request, response);
    });
  });

  describe('Passport local-signup strategy', function () {
    it('passport passes false if email already exists', function (done) {
      const request = httpMocks.createRequest({
        body: {
          email: 'tester@domain.com',
          password: 'password123',
        },
      });
      request.flash = fakeFlash;
      const response = httpMocks.createResponse();
      passport.authenticate('local-signup', {}, (err, user, info) => {
        expect(user).to.be.equal(false);
        expect(info.signupMessage).to.equal('An account with this email address already exists.');
        done(err);
      })(request, response);
    });

    it('passport passes user if email does not already exist', function (done) {
      const request = httpMocks.createRequest({
        body: {
          email: 'TestUser4@mail.com',
          password: '101112',
        },
      });
      request.flash = fakeFlash;
      const response = httpMocks.createResponse();
      passport.authenticate('local-signup', {}, (err, user) => {
        models.Profile.where({ email: 'TestUser4@mail.com' }).fetch()
          .then((profile) => {
            expect(user).to.be.an('object');
            expect(user.id).to.equal(profile.get('id'));
            expect(user.email).to.equal(profile.get('email'));
            done(err);
          });
      })(request, response);
    });
  });
});
