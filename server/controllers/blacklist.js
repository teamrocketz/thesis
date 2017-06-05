const models = require('../../db/models');
const utils = require('./controllerUtils');

module.exports.getBlacklist = (req, res) => {
  models.Blacklist.where({
    profile_id: req.user.id,
  })
  .orderBy('id')
  // .query(qb => qb.limit(MAX_RESULTS_PAGEVIEWS))
  .fetchAll()
  .then((blacklist) => {
    res.status(200).send(blacklist);
  })
  .catch((err) => {
    console.log('getAllBlackList error: ', err);
    res.status(503).send('error');
  });
};

module.exports.addToBlacklist = (req, res) => {
  const newEntry = {
    profile_id: req.user.id,
    domain: req.body.domain,
  };

  utils.isBlacklistDuplicate(newEntry)
  .then((isDuplicate) => {
    if (!isDuplicate) {
      models.Blacklist.forge({
        profile_id: req.user.id,
        domain: req.body.url,
      })
      .save()
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        res.status(500).send({ err });
        return undefined;
      });
    } else {
      res.status(208).send({ err: 'duplicate' });
    }
  })
  .catch((err) => {
    res.status(500).send({ err });
  });
};

module.exports.deleteFromBlacklist = (req, res) => {
  models.Blacklist.where({
    profile_id: req.user.id,
    id: req.body.id,
  }).fetch()
  .then((Pageview) => {
    if (!Pageview) {
      throw new Error('Pageview (id) not found in database');
    }
    return Pageview.destroy();
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('deletePage error: ', err);
    res.status(500).send('error');
  });
};
