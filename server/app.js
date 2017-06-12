// 'use strict';  // commented out per eslint

const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const helmet = require('helmet');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({ extended: false }));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(helmet());

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/blacklist', routes.blacklist);
app.use('/extension', routes.extensionAuth);
app.use('/pageviews', routes.pageviews);
app.use('/tags', routes.tags);
app.route('/*')
  .get(middleware.auth.verify, (req, res) => {
    res.render('index.ejs');
  });

// app.use('/api/profiles', routes.profiles);

module.exports = app;

