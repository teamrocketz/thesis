const models = require('../../db/models');

module.exports.DEFAULT_PAGEVIEW_QUERY_RESULT_SIZE = 30;

module.exports.isDuplicate = entry =>
  models.Pageview.where(entry).orderBy('-time_open').fetch()
  .then((result) => {
    if (!result || !result.attributes) {
      return true;
    }
    const x = new Date(result.attributes.time_open).getTime();
    const y = new Date().getTime();
    if (y - x > 20000) {
      return true;
    }
    return Promise.reject('duplicate');
  });

module.exports.isBlacklist = entry =>
  models.Blacklist.where(entry).orderBy('id').fetch()
  .then((result) => {
    if (!result || !result.attributes) {
      return true;
    }
    return Promise.reject('blacklist');
  });

// sendPageviews sends an HTTP response with the results of a pageview query.
//
// assumes the query requested n+1 rows from the database, where n is the
// number of rows the client requested.  Uses this to determine whether this
// was the last page of results or not.
//
// returns: Promise, result of res.send()
//
module.exports.sendPageviews = (res, pageviews, numResultsRequested) => {
  if (pageviews.length === numResultsRequested + 1) {
    return res.status(200).send({
      pages: pageviews.slice(0, numResultsRequested),
      isLastPage: false,
    });
  }

  return res.status(200).send({
    pages: pageviews,
    isLastPage: true,
  });
};
