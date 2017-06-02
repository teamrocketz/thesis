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


//  gets all active tabs for authenticated user
// sets prev tabs to closed after sending back to client

module.exports.getActive = (req, res) => {
  models.Pageview.where({
    profile_id: req.user.id,
    is_active: true,
  }).fetchAll()
  .then((pageviews) => {
    res.status(200).send(pageviews);
    for (let i = 0; i < pageviews.models.length; i += 1) {
      models.Pageview.where({ id: pageviews.models[i].attributes.id }).fetch()
      .then((Pageview) => {
        if (!Pageview) {
          throw new Error('Pageview (id) not found in database');
        }
        Pageview.save({
          is_active: false,
          time_closed: new Date().toISOString(), // this is going to be weird
        });
      })
      .catch((err) => {
        console.log('deactivate error: ', err);
      });
    }
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
  .then((pageviews) => {
    res.status(200).send(pageviews);
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
  .then((pageviews) => {
    res.status(200).send(pageviews);
  })
  .catch((err) => {
    console.log('searchByTitle error: ', err);
    res.status(503).send('error');
  });
};

// creates a new pageview this could be modified to see if the exact same entry
// exists within the past 1 second and not add if it does

module.exports.visitPage = (req, res) => {
  models.Pageview.forge({
    profile_id: req.user.id,
    url: req.body.url,
    title: req.body.title,
    time_open: new Date().toISOString(),
    time_closed: null,
    is_active: true,
    icon: req.body.icon,
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


module.exports.deletePage = (req, res) => {
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

