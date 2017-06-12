const express = require('express');
const middleware = require('../middleware');
const TagController = require('../controllers').Tags;

const router = express.Router();

// Request: gets list of all tags for user
router.route('/')
  .get(middleware.auth.verify, TagController.getTags);

// Request: tag name, user ID, page ID
router.route('/addtag')
  .post(middleware.auth.verify, TagController.addTag);

// Request: tag name, user ID, page ID
router.route('/removetag')
  .post(middleware.auth.verify, TagController.removeTag);

// Request: tag name, user ID
router.route('/search')
  .post(middleware.auth.verify, TagController.searchTag);

module.exports = router;
