const omdb = require('omdb');
const request = require('request');

module.exports.searchTitle = (title, date, cb) => {
  var query = 'http://www.omdbapi.com/?apikey=92fd20be&include_video=true&';
  var year = JSON.stringify(date).slice(1, 5);
  // console.log(year, '@@')
  query = query + 't=' + title + '&y=' + year;
  console.log('the query is', query);
  request(query, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      var data = res.body;
      cb(null, data);
    }
  });
};
