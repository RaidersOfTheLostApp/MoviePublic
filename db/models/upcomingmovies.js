const db = require('../');
const Promise = require('bluebird');

const Upcoming = db.Model.extend({
  tableName: 'upcoming_movies',
  upcoming_movies: function() {
    return this.belongsTo('Upcoming');

  },
});

module.exports = db.model('Upcoming', Upcoming);
