const db = require('../../db');
const models = require('../../db/models');
const utils = require('./controllerUtils');

const MAX_RESULTS_PAGEVIEWS = 200;

//  gets all from current user or 99999 in test mode ie no browser cookes

module.exports.getAll = (req, res) => {
  console.log('pageviews getAll fired');
  models.Pageview.where({
    profile_id: req.user.id,
  })
  .orderBy('-time_open')
  .query(qb => qb.limit(MAX_RESULTS_PAGEVIEWS))
  .fetchAll()
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
  })
  .orderBy('-time_open')
  .query(qb => qb.limit(MAX_RESULTS_PAGEVIEWS))
  .fetchAll()
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


module.exports.search = (req, res) => {
  console.log('pageviews search fired');

  const sql = `
    SELECT id, url, title, time_open, is_active
    FROM (
      SELECT
        *,
        setweight(to_tsvector(title), 'A') as document
      FROM pageviews
      WHERE profile_id = ${req.user.id}
    ) search
    WHERE search.document @@ plainto_tsquery('${req.query.query}')
    ORDER BY ts_rank(search.document, plainto_tsquery('${req.query.query}')) DESC
    LIMIT ${MAX_RESULTS_PAGEVIEWS};
  `;

  db.knex.raw(sql)
  .then((pageviewsResult) => {
    res.status(200).send(pageviewsResult.rows);
  })
  .catch((err) => {
    console.log('search error: ', err);
    res.status(503).send('error');
  });
};


// creates a new pageview this could be modified to see if the exact same entry
// exists within the past 1 second and not add if it does

module.exports.visitPage = (req, res) => {
  const newEntry = {
    profile_id: req.user.id,
    url: req.body.url,
    title: req.body.title,
    is_active: true,
    icon: req.body.icon,
  };

  // return new Promise((resolve, reject) => {
  //   if (utils.isDuplicate(newEntry)) {
  //     resolve(newEntry);
  //   }
  //   reject('Duplicate entry, not added to DB');
  // });

  if (utils.isDuplicate(newEntry)) {
    console.log('PAGEVIEWS: duplicate entry from visit page in pageviews');
    throw new Error('Duplicate entry, not added to DB');
  } else {
    console.log('PAGEVIEWS: adding item to database');
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
      console.log('PAGEVIEWS: caught error: ', err);
      res.status(208).send('Duplicate Entry');
      return undefined;
    });
  }
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
  models.Pageview.where({
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

