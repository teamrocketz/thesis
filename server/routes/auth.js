const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.route('/')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });

router.route('/home')
  .get((req, res) => {
    res.render('landing.ejs');
  });

router.route('/getextension')
  .get((req, res) => {
    res.render('getextension.ejs');
  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(middleware.passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }));

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(middleware.passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true,
  }));

router.route('/index')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs', {
      user: req.user, // get the user out of session and pass to template
    });
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy();
    req.logOut();
    res.redirect('/');
  });


module.exports = router;
