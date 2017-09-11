const db = require('../');
const Promise = require('bluebird');

const Genres = db.Model.extend({
  tableName: 'genres',
  genres: function() {
    return this.belongsTo('Genres');
  },
});

module.exports = db.model('Genres', Genres);
