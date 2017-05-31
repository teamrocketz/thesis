const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();

module.exports.verify = (req, res, next) => {
  if (!req.user) {
    req.user = {
      id: '99999',
    };
    return next();
  } else if (req.isAuthenticated()) {
    return next();
  }
  if (!req.headers.extension) {
    res.redirect('/webpage/login');
  } else if (req.headers.extension) {
    res.redirect('/extension/login');
  }
  return undefined;
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: 'localhost',
    port: 6379,
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false,
});
