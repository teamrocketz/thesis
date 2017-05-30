const models = require('../../db/models');

//  gets all from current user or 'testy mctester' in test mode ie no browser cookes

module.exports.getAll = (req, res) => {
  console.log('pageviews getAll fired');
  models.Pageview.fetchAll({
    user_Id: req.user ? req.user.id || 'testy mctester' : 'testy mctester',  
  })
    .then((pageviews) => {
      res.status(200).send(pageviews);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
};


//  gets all active from current user or 'testy mctester' in test mode ie no session

module.exports.getActive = (req, res) => {
  console.log('pageviews getActive fired');
  models.Pageview.where({
      user_Id: req.user ? req.user.id || 'testy mctester' : 'testy mctester',
      is_Active: true,
    }).fetchAll()
    .then((profiles) => {
      res.status(200).send(profiles);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
};


//  searches by exact url

module.exports.search = (req, res) => {
  console.log('pageviews search fired');
  models.Pageview.where({ url: req.body.url }).fetchAll()
    .then((profiles) => {
      res.status(200).send(profiles);
    })
    .catch((err) => {
      res.status(503).send(err);
    });
};


//  creates a new pageview, if no session, user_Id is 'testy mctester' 

module.exports.visitPage = (req, res) => {
  models.Pageview.forge({
    user_Id: req.user ? req.user.id || 'testy mctester' : 'testy mctester',
    url: req.body.url,
    title: req.body.url,
    time_Open: Date.now(),
    time_Closed: null,
    is_Active: true,
  })
  .save()
  .then(result => {
    res.status(201).send(result);
  })
  .catch(err => {
   if (err.constraint === 'users_username_unique') {
     return res.status(403);
    }
    console.log(err)
    res.status(500).send(err);
  });
};


//  searches by id, turns is_Active to false

module.exports.deactivatePage = (req, res) => {
  models.Pageview.where({ id: req.body.id }).fetch()
    .then((Pageview) => {
      if (!Pageview) {
        throw Pageview;
      }
      Pageview.save({
        is_Active: false,
      });
      res.status(200).send('OK');
    })
    .error((err) => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};


//  searches by id, deletes pageview

module.exports.deletePage = (req, res) => {
  models.Pageview.where({ id: req.body.id }).fetch()
    .then(Pageview => {
      if (!Pageview) {
        throw Pageview;
      }
      return Pageview.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(503).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};


//  We likely will rewrite/cancel these - see above
//  they are still here because they are required from server/pageviews

// module.exports.getOne = (req, res) => {
//   console.log('pageviews getOne fired');
//   models.Pageview.where({ id: req.params.id }).fetch()
//     .then((Pageview) => {
//       if (!Pageview) {
//         throw Pageview;
//       }
//       res.status(200).send(Pageview);
//     })
//     .error((err) => {
//       res.status(500).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

// module.exports.update = (req, res) => {
//   console.log('pageviews update fired');
//   models.Pageview.where({ id: req.params.id }).fetch()
//     .then((Pageview) => {
//       if (!Pageview) {
//         throw Pageview;
//       }
//       return Pageview.save(req.body, { method: 'update' });
//     })
//     .then(() => {
//       res.sendStatus(201);
//     })
//     .error((err) => {
//       res.status(500).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

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
