// 'use strict';  // commented out per eslint

const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.redirect('/webpage');
});

app.get('/dummy', (req, res) => {
  console.log('hey from dummy');
  res.send(`[
      { title: 'KRON4 News', snippet: 'Best website ever omg it's so good' },
      { title: 'Hack Reactor', snippet: 'Best website ever omg it's so good' },
      { title: 'Porn', snippet: 'Best website ever omg it's so good' },
      { title: 'Mega ultra porn', snippet: 'Best website ever omg it's so good' },]`);
});
app.use('/webpage', routes.auth);
app.use('/extension', routes.extensionAuth);
app.use('/pageviews', routes.pageviews);

// app.use('/api/profiles', routes.profiles);

module.exports = app;

