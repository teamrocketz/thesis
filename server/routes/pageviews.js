
const express = require('express');

const router = express.Router();

const middleware = require('../middleware');

const PageviewController = require('../controllers').Pageviews;


router.route('/')
  .get(middleware.auth.verify, PageviewController.getAll)
  ;

router.route('/active')
  .get(middleware.auth.verify, PageviewController.getActive)
  ;

router.route('/search')
  .post(middleware.auth.verify, PageviewController.searchByUrl)
  ;

router.route('/searchtitle')
  .post(middleware.auth.verify, PageviewController.searchByTitle)
  ;

router.route('/visitpage')
  .post(middleware.auth.verify, PageviewController.visitPage)
  ;

router.route('/deactivate')
  .post(middleware.auth.verify, PageviewController.deactivatePage)
  ;

router.route('/delete')
  .post(middleware.auth.verify, PageviewController.deletePage)
  ;

module.exports = router;
