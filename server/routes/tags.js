const express = require('express');
const middleware = require('../middleware');
const TagController = require('../controllers').Tags;

const router = express.Router();

// Request: tag name, user ID, page ID
router.route('/addtag')
  .post(middleware.auth.verify, TagController.addTag);

// Request: tag name, user ID, page ID
router.route('/removetag')
  .post(middleware.auth.verify, TagController.removeTag);

module.exports = router;
