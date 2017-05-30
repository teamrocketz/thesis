const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/webpage/profile',
    failureRedirect: '/webpage/login',
    failureFlash: true,
  }));

router.route('/dummy')
  .get((req, res) => {
    res.send(`[
      { title: 'KRON4 News', snippet: 'Best website ever omg it's so good' },
      { title: 'Hack Reactor', snippet: 'Best website ever omg it's so good' },
      { title: 'Porn', snippet: 'Best website ever omg it's so good' },
      { title: 'Mega ultra porn', snippet: 'Best website ever omg it's so good' },]` // eslint-disable-line comma-dangle
    );
  });

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/webpage/profile',
    failureRedirect: '/webpage/signup',
    failureFlash: true,
  }));

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    res.render('profile.ejs', {
      user: req.user, // get the user out of session and pass to template
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/webpage');
  });


module.exports = router;
