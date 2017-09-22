'use strict';
const app = require('./app');
const db = require('../db');
const searchDb = require('../mongodb/db.js');

const PORT = 8080;

app.listen(PORT, () => {
  console.log('Movie Master App listening on port ' + PORT);
});
