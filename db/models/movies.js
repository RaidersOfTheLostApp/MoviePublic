const db = require('../');
const Promise = require('bluebird');

const Movies = db.Model.extend({
  tableName: 'movies',
  movies: function() {
    return this.belongsTo('Movies');
  },
});

module.exports = db.model('Movies', Movies);
