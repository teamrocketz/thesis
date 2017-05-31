const models = require('../../db/models');

//  gets all from current user or 99999 in test mode ie no browser cookes

module.exports.getAll = (req, res) => {
  console.log('pageviews getAll fired');
  models.Pageview.where({
    profile_id: req.user.id,
  }).fetchAll()
  .then((pageviews) => {
    res.status(200).send(pageviews);
  })
  .catch((err) => {
    console.log('getAll error: ', err);
    res.status(503).send('error');
  });
};


//  gets all active from current user or 99999 in test mode ie no session

module.exports.getActive = (req, res) => {
  console.log('pageviews getActive fired');
  models.Pageview.where({
    profile_id: req.user.id,
    is_active: true,
  }).fetchAll()
  .then((profiles) => {
    res.status(200).send(profiles);
  })
  .catch((err) => {
    console.log('getActive error: ', err);
    res.status(503).send('error');
  });
};


//  searches by exact url

module.exports.searchByUrl = (req, res) => {
  console.log('pageviews search fired');
  models.Pageview.where({ url: req.body.url }).fetchAll()
  .then((profiles) => {
    res.status(200).send(profiles);
  })
  .catch((err) => {
    console.log('searchByUrl error: ', err);
    res.status(503).send('error');
  });
};


//  searches by exact title

module.exports.searchByTitle = (req, res) => {
  console.log('pageviews search fired');
  models.Pageview.where({ title: req.body.title }).fetchAll()
  .then((profiles) => {
    res.status(200).send(profiles);
  })
  .catch((err) => {
    console.log('searchByTitle error: ', err);
    res.status(503).send('error');
  });
};

//  creates a new pageview, if no session, profile_id is 99999

module.exports.visitPage = (req, res) => {
  models.Pageview.forge({
    profile_id: req.user.id,
    url: req.body.url,
    title: req.body.url,
    time_open: new Date().toISOString(),
    time_closed: null,
    is_active: true,
  })
  .save()
  .then((result) => {
    res.status(201).send(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('error');
    return undefined;
  });
};


//  searches by id, turns is_Active to false

module.exports.deactivatePage = (req, res) => {
  models.Pageview.where({ id: req.body.id }).fetch()
  .then((Pageview) => {
    if (!Pageview) {
      throw new Error('Pageview (id) not found in database');
    }
    Pageview.save({
      is_active: false,
      time_closed: new Date().toISOString(),
    });
    res.status(200).send('OK');
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('error');
    return undefined;
  });
};


//  searches by id, deletes pageview

module.exports.deletePage = (req, res) => {
  console.log(req.body);
  models.Pageview.where({ id: req.body.id }).fetch()
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
