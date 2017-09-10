const db = require('../');
const Promise = require('bluebird');

const Genres = db.Model.extend({
  tableName: 'genre',
  genres: function() {
    return this.belongsTo('Genres');
  },
});

module.exports = db.model('Genres', Genres);
