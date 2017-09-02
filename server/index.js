'use strict';
const app = require('./app');
const db = require('../db');
<<<<<<< HEAD
const PORT = process.env.PORT || 3000;
=======
const searchDb = require('../mongodb/db.js');

const PORT = process.env.port || 3000;
>>>>>>> added grunt http and finished searchByTitle route

app.listen(PORT, () => {
  console.log('Movie Master App listening on port ' + PORT);
});
