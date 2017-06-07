/* eslint-disable func-names, prefer-arrow-callback */

const Profile = require('../../db/models/profiles.js');
const dbUtils = require('../lib/dbUtils.js');

const chai = require('chai');
const dirtyChai = require('dirty-chai');

const expect = chai.expect;
chai.use(dirtyChai);

describe('Profile model', function () {
  let expected;

  before(function () {
    expected = dbUtils.readCsv('profiles');
  });

  beforeEach(function (done) {
    dbUtils.reinitialize(done);
  });

  it('Should be able to retrieve test data', function (done) {
    Profile.forge().fetchAll()
      .then(function (results) {
        expect(results.length).to.equal(expected.length);
        expect(results.at(0).get('id')).to.equal(expected[0].id);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  xit('Should verify that all usernames are unique', function (done) {
    // Insert a user with an e-mail that's already in existence
    Profile.forge({ email: 'bob@domain.com', password: 'abc' }).save()
      .then(function () {
        done(new Error('was not supposed to succeed'));
      })
      .catch(function (err) {
        expect(err).to.be.an('error');
        expect(err).to.match(/duplicate key value violates unique constraint/);
        done();
      });
  });

  xit('Should be able to update an already existing record', function (done) {
    Profile.where({ id: 100000 }).fetch()
      .then(function (result) {
        expect(result.get('id')).to.equal(1);
      })
      .then(function () {
        return Profile.where({ id: 1 }).save({ first: 'James', last: 'Davenport' }, { method: 'update' });
      })
      .then(function () {
        return Profile.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result.get('first')).to.equal('James');
        expect(result.get('last')).to.equal('Davenport');
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });

  it('Should be able to delete a record', function (done) {
    // Inserts a user
    Profile.where({ id: 1 }).destroy()
      // verifies that the user has been inserted
      .then(function () {
        return Profile.where({ id: 1 }).fetch();
      })
      .then(function (result) {
        expect(result).to.equal(null);
        done();
      })
      .catch(function (err) {
        // If this expect statement is reached, there's an error.
        done(err);
      });
  });
});
