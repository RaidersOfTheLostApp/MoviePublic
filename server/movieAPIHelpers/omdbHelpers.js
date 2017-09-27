const omdb = require('omdb');
const request = require('request');
const async = require('async');
const tmdb = require('./tmdb.js');
var getTrailers = require('./tmdbHelpers.js').getTrailersById;

module.exports.searchTitle = (title, date, cb) => {
  var query = 'http://www.omdbapi.com/?apikey=92fd20be&include_video=true&';
  var year = JSON.stringify(date).slice(1, 5);
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

module.exports.searchTitleArray = (movies, cb) => {
  // var newArray = [];
  var query = 'http://www.omdbapi.com/?apikey=92fd20be&include_video=true&';

  async.map(movies, function(value, callback) {
    // console.log('the initial value is', value.title);
    var date = value.release_date;
    var title = value.title;
    value['poster_path'] = tmdb.images_uri + value.poster_path;
    // console.log('the movie title is', title);
    var year = JSON.stringify(date).slice(1, 5);
    newQuery = query + 't=' + title + '&y=' + year;
    request(newQuery, (err, res) => {
      if (err) {
        console.log('there was an error querying the data!');
      } else {
        var data = res.body;
        if (!data || data[0] === '<' || data[0] === 'I') {
          console.log('the code is breaking under Searching it ', data);
        }
        var newData = JSON.parse(data);
        value['Actors'] = newData.Actors ? newData.Actors : 'N/A';
        value['Director'] = newData.Director ? newData.Director : 'N/A';
        value['Genre'] = newData.Genre ? newData.Genre : 'N/A';
        value['Runtime'] = newData.Runtime ? newData.Runtime : 'N/A';
        value['Website'] = newData.Website ? newData.Website : 'N/A';
        value['Ratings'] = newData.Ratings ? newData.Ratings : [];
        value['imdbID'] = newData.imdbID ? newData.imdbID : 'noimdbID-' + value.title;
        // console.log('********** newData to update poster ', newData.Title);
        getTrailers(newData.imdbID, (err, result) => {
          if (err) {
            // console.log ('there was a problem getting the trailer!');
            callback(err);
          } else {
            value['trailers'] = result;
            if (newData.Response !== 'False') {
              // newArray.push(newData);
            }
            // console.log('the new array is', value);
            callback(null, value);
          }
        });
      }
    });
  }, function(err, results) {
    if (err) {
      console.log('we got an error');
      cb(err);
    } else {
      // console.log('*********** results of searchTitleArray ', results);
      cb(null, results);
    }
  });
};
