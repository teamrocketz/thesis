const express = require('express');
const middleware = require('../middleware');

const router = express.Router();


router.post('/login', (req, res, next) => {
  middleware.passport.authenticate('local-login', (err, user) => {
    if (err) {
      console.log('authenticate error: ', err);
      return res.send('error');
    } else if (!user) {
      return res.send('noUser');
    } req.logIn(user, (error) => {
      if (error) {
        console.log(error);
        return res.send('error');
      }
      return res.send('loggedIn');
    });
    return undefined;
  })(req, res, next);
});


// router.route('/signup')
//   .get((req, res) => {
//     res.render('signup.ejs', { message: req.flash('signupMessage') });
//   })
//   .post(middleware.passport.authenticate('local-signup', {
//     successRedirect: '/profile',
//     failureRedirect: '/signup',
//     failureFlash: true,
//   }));

router.post('/signup', (req, res, next) => {
  middleware.passport.authenticate('local-signup', (err, user) => {
    if (err) {
      console.log('auth error on signup: ', err);
      return res.send('error');
    } req.logIn(user, (error) => {
      if (error) {
        console.log('login error on signup: ', error);
        return res.send('error');
      }
      return res.send('loggedIn');
    });
    return undefined;
  })(req, res, next);
});


router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.send('loggedOut');
  });

// router.get('/logout', (req, res) => {
//     req.logout((err) =>{
//       if (err) {
//         console.log('logout error: ', err)
//         res.send('error');
//       } else {
//         res.send('loggedOut');
//       }
//     });
//   });

module.exports = router;
