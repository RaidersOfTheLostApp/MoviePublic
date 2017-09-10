const db = require('../');
const Promise = require('bluebird');

const Crew = db.Model.extend({
  tableName: 'crew',
  crew: function() {
    return this.belongsTo('Crew');
  },
});

module.exports = db.model('Crew', Crew);
