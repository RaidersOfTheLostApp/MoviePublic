const tmdb = require('./tmdb.js');

var findInTheaters = (cb) => {
  tmdb.discover({sort_by: popularity}, (data) => {cb(null, data)}, (data) => {cb(data, null)})
}
