'use strict';
const express = require('express');
const router = express.Router();
const PageviewController = require('../controllers').Pageviews;

router.route('/')
  .get(PageviewController.getAll)
  // .post(PageviewController.create)
  ;

router.route('/:id')
  .get(PageviewController.getOne)
  .put(PageviewController.update)
  // .delete(PageviewController.deleteOne)
  ;

module.exports = router;
