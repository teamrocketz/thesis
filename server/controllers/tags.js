const models = require('../../db/models');

const DEFAULT_RESULT_SIZE = 30;

module.exports.getTags = (req, res) => {
  models.Tag.where({
    profile_id: req.user.id,
  })
  .fetchAll()
  .then((tags) => {
    res.status(200).send(tags);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

module.exports.addTag = (req, res) => {
  models.Tag.forge({
    name: req.body.name,
    profile_id: req.user.id,
    pageview_id: req.body.pageId,
  })
  .save()
  .then((tag) => {
    res.status(200).send(tag);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

module.exports.removeTag = (req, res) => {
  models.Tag.where({
    id: req.body.tagId,
    name: req.body.name,
    profile_id: req.user.id,
    pageview_id: req.body.pageId,
  })
  .fetch()
  .then((tag) => {
    if (!tag) {
      throw new Error(`Tag ${req.body.name} not found`);
    } else {
      return tag.destroy();
    }
  })
  .then(() => {
    res.status(200).send(req.body);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

module.exports.searchTag = (req, res) => {
  models.Tag.where({
    name: req.body.query,
    profile_id: req.user.id,
  })
  .fetchAll()
  .then((results) => {
    const pageViews = [];
    results.forEach((tag) => {
      pageViews.push(tag.attributes.pageview_id);
    });
    return pageViews;
  })
  .then((pageIDs) => {
    const numResults = req.body.numResults || DEFAULT_RESULT_SIZE;

    let query = models.Pageview.where('id', 'IN', pageIDs);
    if (req.body.minId) {
      query = query.where('id', '>=', req.body.minId);
    }
    if (req.body.maxId) {
      query = query.where('id', '<=', req.body.maxId);
    }

    query
    .orderBy('-id')
    .query(qb => qb.limit(numResults))
    .fetchAll({
      withRelated: ['tags'],
    })
    .then((pages) => {
      res.status(200).send(pages);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  });
};
