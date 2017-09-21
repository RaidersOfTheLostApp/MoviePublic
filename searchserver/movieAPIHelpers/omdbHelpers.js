const omdb = require('omdb');
const request = require('request');

module.exports.searchTitle = (title, cb) => {
  var query = 'http://www.omdbapi.com/?t=&apikey=92fd20be&include_video=true&';
  query = query + 't=' + title;
  request(query, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, res);
    }
  });
};
