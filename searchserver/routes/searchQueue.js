var Agenda = require('agenda');
var axios = require('axios');
var mongoConnectionString = 'mongodb://127.0.0.1:27071/fetcher;';
var db = require('../../mongodb/db');
var searchTitle = require('../movieAPIHelpers/omdbHelpers');

var agenda = new Agenda({
  db: {address: mongoConnectionString}
});

function ignoreErrors() {}

agenda._db.ensureIndex('nextRunAt', ignoreErrors)
.ensureIndex('lockedAt', ignoreErrors)
.ensureIndex('name', ignoreErrors)
.ensureIndex('priority', ignoreErrors);

var searchEngine = {
  processQueue: function(idArray, cb) {
    if(idArray.length === 0){
      return;
    }
    searchTitle(id, (err, res) => {
      if(err) {
        console.log('process queue is broken')
      }else if (res.body.length > 0){
        db.searchByIds(idArray, (err, res) => {
          if(err){
            console.log('broke in searchworker')
          }else{
            db.saveMovies(res)
          }
        })
      }
    })


  })
}

agenda
  .define('process search queue', { nextRunAt: 1, priority: -1 }, function(job, done) {
    db.ids.find({})
      .then( idArray => {
        searchEngine.processQueue(idArray, (err ,res) => {

        })
      })
    done();
  })
  .on('ready', () => {
    agenda.processEvery('1 second', 'process search queue');
    agenda.start();
  })
