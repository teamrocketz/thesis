const express = require('express');
const middleware = require('../middleware');
const BlacklistController = require('../controllers').Blacklist;

const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, BlacklistController.getAllBlacklists)
  ;

router.route('/add')
  .get(middleware.auth.verify, BlacklistController.addBlacklist)
  ;

router.route('/delete')
  .get(middleware.auth.verify, BlacklistController.deleteBlacklist)
  ;
