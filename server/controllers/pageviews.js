const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  console.log('pageviews getAll fired');
  models.Pageview.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Pageview.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  console.log('pageviews getOne fired');
  models.Pageview.where({ id: req.params.id }).fetch()
    .then(Pageview => {
      if (!Pageview) {
        throw Pageview;
      }
      res.status(200).send(Pageview);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  console.log('pageviews update fired');
  models.Pageview.where({ id: req.params.id }).fetch()
    .then(Pageview => {
      if (!Pageview) {
        throw Pageview;
      }
      return Pageview.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

// module.exports.deleteOne = (req, res) => {
//   models.Pageview.where({ id: req.params.id }).fetch()
//     .then(Pageview => {
//       if (!Pageview) {
//         throw Pageview;
//       }
//       return Pageview.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
