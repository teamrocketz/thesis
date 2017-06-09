const express = require('express');
const middleware = require('../middleware');
const PageviewController = require('../controllers').Pageviews;

const router = express.Router();

// All GET functions return pageviews in descending chronological order

// Request: GET /?[minId={number}]&[maxId={nunber}]&[numResults={number}]
// Returns: [ {pageView1}, ..., {pageViewN} ]
//    All of the user's pageViews within the specified id range
//    up to a max of numResults
router.route('/')
  .get(middleware.auth.verify, PageviewController.getAll);

// Request: GET /active
// Returns: [ {pageView1}, ..., {pageViewN} ]
//    All pageViews which the user currently has open
router.route('/active')
  .get(middleware.auth.verify, PageviewController.getActive);

// Request: GET /pageviews/search?query={string}
// Returns: [ {pageView1}, ..., {pageViewN} ]
//    All pageViews with title matching search criteria
router.route('/search')
  .get(middleware.auth.verify, PageviewController.search);

// Request: POST /pageviews/deactivate
// Body:    { url, title, time_open, icon }
//    Adds pageview to database
router.route('/visitpage')
  .post(middleware.auth.verify, PageviewController.visitPage);

// Request: POST /pageviews/deactivate
// Body:    { id: pageview_id }
//   Records the user closing a tab
router.route('/deactivate')
  .post(middleware.auth.verify, PageviewController.deactivatePage);

// Request: POST /pageviews/delete
// Body:    { id: pageview_id }
router.route('/delete')
  .post(middleware.auth.verify, PageviewController.deletePage);

module.exports = router;
