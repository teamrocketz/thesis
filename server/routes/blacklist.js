const express = require('express');
const middleware = require('../middleware');
const BlacklistController = require('../controllers').Blacklist;

const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, BlacklistController.getBlacklist)
  ;

router.route('/add')
  .post(middleware.auth.verify, BlacklistController.addToBlacklist)
  ;

router.route('/delete')
  .post(middleware.auth.verify, BlacklistController.deleteFromBlacklist)
  ;

module.exports = router;
