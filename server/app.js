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
  const data = [
      { id: 0, title: 'KRON4 News', snippet: 'Best website ever omg it\'s so good' },
      { id: 1, title: 'Hack Reactor', snippet: 'Best website ever omg it\'s so good' },
      { id: 2, title: 'Porn', snippet: 'Best website ever omg it\'s so good' },
      { id: 3, title: 'Mega ultra porn', snippet: 'Best website ever omg it\'s so good' },
  ];
  console.log('hey from dummy', data);
  res.send(data);
});
app.use('/webpage', routes.auth);
app.use('/extension', routes.extensionAuth);
app.use('/pageviews', routes.pageviews);

// app.use('/api/profiles', routes.profiles);

module.exports = app;

