/* eslint-disable func-names, prefer-arrow-callback */

// 'use strict';  // commented out per eslint

const request = require('supertest');
const app = require('../../server/app.js');

const chai = require('chai');
const dirtyChai = require('dirty-chai');

const expect = chai.expect;
chai.use(dirtyChai);

describe('basic server', function () {
  xit('sends back hello world', function (done) {
    request(app)
      .get('/api')
      .expect(200)
      .expect((res) => {
        expect(res.text).to.equal('Hello World!');
      })
      .end(done);
  });

  xit('accepts POST request', function (done) {
    request(app)
      .post('/api')
      .expect(201)
      .expect((res) => {
        expect(res.body.data).to.equal('Posted!');
      })
      .end(done);
  });
});
