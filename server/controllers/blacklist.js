const models = require('../../db/models');
const utils = require('./controllerUtils');

module.exports.getBlacklist = (req, res) => {
  models.Blacklist.where({
    profile_id: req.user.id,
  })
  .orderBy('id')
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
  const blacklistEntry = {
    profile_id: req.user.id,
    domain: req.body.domain,
  };

  utils.isBlacklist(blacklistEntry)
  .then(() => { //eslint-disable-line
    return models.Blacklist.forge(blacklistEntry)
    .save();
  })
  .then((result) => {
    console.log(result);
    res.status(201).send(result);
  })
  .error((err) => {
    res.status(500).send({ err });
  })
  .catch((err) => {
    console.log('duplicate/blacklist detected', err);
    res.status(409).send({ err });
  });
};

module.exports.deleteFromBlacklist = (req, res) => {
  console.log('delete form black list', req.body.domain);
  models.Blacklist.where({
    profile_id: req.user.id,
    domain: req.body.domain,
  }).fetch()
  .then((Blacklist) => {
    if (!Blacklist) {
      throw new Error('Blacklist (id) not found in database');
    }
    return Blacklist.destroy();
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    console.log('deletePage error: ', err);
    res.status(500).send('error');
  });
};
