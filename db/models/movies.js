const db = require('../');
const Promise = require('bluebird');

const Movies = db.Model.extend({
  tableName: 'movies',
  movies: function() {
    return this.belongsTo('Movie');
  },
});

module.exports = db.model('Movies', Movies);
