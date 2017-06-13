const express = require('express');
const middleware = require('../middleware');

const router = express.Router();


router.post('/login', (req, res, next) => {
  middleware.passport.authenticate('local-login', (err, user) => {
    if (err) {
      return res.status(404).send('error');
    } else if (!user) {
      return res.status(404).send('noUser');
    } req.logIn(user, (error) => {
      if (error) {
        console.log(error);
        return res.status(404).send('error');
      }
      return res.status(200).send('loggedIn');
    });
    return undefined;
  })(req, res, next);
});

router.get('/log', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.post('/signup', (req, res, next) => {
  middleware.passport.authenticate('local-signup', (err, user) => {
    if (err) {
      return res.send('error');
    } req.logIn(user, (error) => {
      if (error) {
        return res.send('error');
      }
      return res.send('loggedIn');
    });
    return undefined;
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  console.log('Goodbye!');
  req.logout();
  res.status(200).end();
});

module.exports = router;
