const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../../db/models');

class InvalidUserError extends Error {}
class InvalidPasswordError extends Error {}

passport.serializeUser((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser((id, done) => (
  models.Profile.where({ id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw new InvalidUserError();
      }
      done(null, profile.serialize());
    })
    .catch(InvalidUserError, () => {
      done(null, false, { message: 'No user found' });
    })
    .catch((err) => {
      done(err, null);
    })
));

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
},
  (req, email, password, done) => (
    // check to see if there is a local account with this email address
    models.Profile.where({ email }).fetch({
      withRelated: [{
        auths: query => query.where({ type: 'local' }),
      }],
    })
      .then((profile) => {
        // create a new profile if a profile does not exist
        if (!profile) {
          return models.Profile.forge({ email }).save();
        }
        // throw if local auth account already exists
        if (profile.related('auths').at(0)) {
          throw new InvalidUserError();
        }

        return profile;
      })
      .tap(profile => (
        // create a new local auth account with the user's profile id
        models.Auth.forge({
          password,
          type: 'local',
          profile_id: profile.get('id'),
        }).save()
      ))
      .then((profile) => {
        // serialize profile for session
        done(null, profile.serialize());
      })
      .catch(InvalidUserError, () => {
        done(null, false, req.flash('signupMessage', 'An account with this email address already exists.'));
      })
      .catch((err) => {
        done(err, null);
      })
)));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
},
  (req, email, password, done) => (
    // fetch any profiles that have a local auth account with this email address
    models.Profile.where({ email }).fetch({
      withRelated: [{
        auths: query => query.where({ type: 'local' }),
      }],
    })
      .then((profile) => {
        // if there is no profile with that email or if there is no local auth account with profile
        if (!profile || !profile.related('auths').at(0)) {
          throw new InvalidUserError();
        }

        // check password and pass through account
        return Promise.all([profile, profile.related('auths').at(0).comparePassword(password)]);
      })
      .then(([profile, match]) => {
        if (!match) {
          throw new InvalidPasswordError();
        }
        // if the password matches, pass on the profile
        return profile;
      })
      .then((profile) => {
        // call done with serialized profile to include in session
        done(null, profile.serialize());
      })
      .catch(InvalidUserError, InvalidPasswordError, () => {
        done(null, false, req.flash('loginMessage', 'Incorrect username or password'));
      })
      .catch((err) => {
        console.log(err);
        done(err, null);
      })
)));

module.exports = passport;
