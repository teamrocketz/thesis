const config = require('config');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient(config.redis.url);

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
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
    logErrors: config.redis.logErrors,
  }),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
});

redisClient.on('connect', () => {
  const sanitizedUrl = config.redis.url.includes('@') ? `redis://${config.redis.url.match(/@(.*$)/)[1]}` : config.redis.url;
  console.log(`Connected to Redis server at ${sanitizedUrl}`);
});
