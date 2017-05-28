const express = require('express');
const middleware = require('../middleware');

const router = express.Router();


router.post('/login', (req, res, next) => {
  middleware.passport.authenticate('local-login', (err, user) => {
    if (err) {
      return res.send('error');
    } else if (!user) {
      return res.send('noUser');
    } req.logIn(user, (error) => {
      if (error) {
        return res.send('error');
      }
      return res.send('loggedIn');
    });
    return undefined;
  })(req, res, next);
});


router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  }));

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user,
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
