// 'use strict';   // commented out per eslint

const express = require('express');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    res.status(201).send({ data: 'Posted!' });
  });

module.exports = router;
