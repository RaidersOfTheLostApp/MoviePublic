const omdb = require('omdb');
const request = require('request');
const async = require('async');
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
  var newArray = [];
  var query = 'http://www.omdbapi.com/?apikey=92fd20be&include_video=true&';

  async.each(movies, function(value, callback) {
    console.log('the initial value is', value);
    var date = value.release_date;
    var title = value.title;
    console.log('the movie title is', title);
    var year = JSON.stringify(date).slice(1, 5);
    newQuery = query + 't=' + title + '&y=' + year;
    request(newQuery, (err, res) => {
      if (err) {
        console.log('there was an error querying the data!');
      } else {
        var data = res.body;
        if (!data || data[0] === '<' || data[0] === 'I') {
          // console.log('the code is breaking under Searching it');
        }
        var newData = JSON.parse(data);
        getTrailers(newData.imdbID, (err, result) => {
          if (err) {
            // console.log ('there was a problem getting the trailer!');
          } else {
            newData['trailers'] = result;
            if (newData.Response !== 'False') {
              newArray.push(newData);
            }
            console.log('the new array is', newArray);
            callback();
          }
        }); 
      }
    });
  }, function(err) {
    if (err) {
      console.log('we got an error');
    } else {
      cb(err, newArray);
    }
  });
};




  
