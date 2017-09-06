const omdb = require('omdb');
const request = require('request');

module.exports.searchTitle = (title, cb) => {
  var query = 'http://www.omdbapi.com/?i=tt3896198&apikey=92fd20be&include_video=true&'
  query = query + 't=' + title;
  request(query, (err, res) => {
    if(err){
      cb(err, null);
    }else{
      console.log(res.body )
      cb(null ,res)
    }
  })
  // omdb.search(title, (err, res) => {
  //   if(err){
  //     console.log(err, '21234')
  //   }else{
  //     console.log(res)
  //   }
  // })
}
