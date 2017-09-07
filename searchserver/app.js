'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const db = require('../mongodb/db.js');
const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(middleware.auth.session);
// app.use(middleware.passport.initialize());
// app.use(middleware.passport.session());
// app.use(middleware.flash());
app.get('/search', (req, res => {
  
}));


var port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log('App is now running on port ', port);
});

module.exports = app;
