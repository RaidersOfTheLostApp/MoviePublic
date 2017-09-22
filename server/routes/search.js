'use strict';
const express = require('express');
const middleware = require('../middleware');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

const tmdb = require('../movieAPIHelpers/tmdb.js');
const tmdbHelp = require('../movieAPIHelpers/tmdbHelpers.js');
const models = require('../../db/models');
const searchDb = require('../../mongodb/db.js');
const search = require('./search.js');
const gracenote = require('../movieAPIHelpers/gracenote.js');

const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};

const axios = require('axios');
const querystring = require('querystring');

router.route('/')
  .get(middleware.auth.verify, (req, res, next) => {
    console.log(querystring.stringify(req.query));
    axios.get('http://127.0.0.1:8080?value=' + req.query.value)
      .then( data => {
        console.log(data.data, '%%%%%');
        res.send(data.data);
      })
      .catch( err => {
        console.log(err, 'searchbroke');
      }
      );
  });

router.route('/id')
  .get(middleware.auth.verify, (req, res, next) => {
    console.log(querystring.stringify(req.query), 'in id');
    axios.get('http://127.0.0.1:8080/id?value=' + req.query.value)
      .then( data => {
        console.log(data.data, 'MAIN SERVER RESPONSE FROM SEARCH SERVER');
        res.json(data.data);
      })
      .catch( err => {
        console.log(err, 'searchbroke');
      }
      );
  });

// router.route('/gettheaters')
// .get(middleware.auth.verify, (req, res, next) => {
//   var playingArray = req.query.startDate.split(' ');
//   var monthArray = {
//   'Jan': '01',
//   'Feb': '02',
//   'Mar': '03',
//   'Apr': '04',
//   'May': '05',
//   'Jun': '06',
//   'Jul': '07',
//   'Aug': '08',
//   'Sep': '09',
//   'Oct': '10',
//   'Nov': '11',
//   'Dec': '12'
//   }

//   var newPlayingData = playingArray[3] + '-' + monthArray[playingArray[1]] + '-' + playingArray[2];

//   var params = {
//     startDate: newPlayingData,
//     numDays: req.query.numDays,
//     zip: req.query.zip,
//     radius: req.query.radius
//   }

//   gracenote.call(params, (data) => {
//       res.send(data);
//     }, (data) => {
//       res.send(null);
//   });
// })

module.exports = router;

//sample movie path: http://image.tmdb.org/t/p/w500/cbRQVCia0urtv5UGsVFTdqLDIRv.jpg
