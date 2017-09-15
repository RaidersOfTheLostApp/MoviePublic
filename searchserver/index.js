'use strict';
const app = require('./app');
const db = require('../db');
const searchDb = require('../mongodb/db.js');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Movie Master App listening on port ' + PORT);
});
