const omdb = require('omdb');
const request = require('request');

module.exports.searchTitle = (title, cb) => {
  var query = 'http://www.omdbapi.com/?i=tt3896198&apikey=81c8f36d&'
  query = query + 't=' + title;
  request(query, (err, res) => {
    if(err){alert(err)}
    console.log(res.body, 'REQUESTED')
  })
  // omdb.search(title, (err, res) => {
  //   if(err){
  //     console.log(err, '21234')
  //   }else{
  //     console.log(res)
  //   }
  // })
}
