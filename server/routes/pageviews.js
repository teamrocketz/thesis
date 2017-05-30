
const express = require('express');

const router = express.Router();

const PageviewController = require('../controllers').Pageviews;

router.route('/')
  .get(PageviewController.getAll)
  ;

router.route('/active')
  .get(PageviewController.getActive)
  ;

router.route('/search')
  .post(PageviewController.search)
  ;

router.route('/visitpage')
  .post(PageviewController.visitPage)
  ;

router.route('/deactivate')
  .post(PageviewController.deactivatePage)
  ;

router.route('/delete')
  .post(PageviewController.deletePage)

module.exports = router;
