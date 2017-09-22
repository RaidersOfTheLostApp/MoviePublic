const models = require('../../db/models');

module.exports.getRecommendations = (user_id, callback) => {
  let favoritesObj = {
    favorites: [],
    genres: [],
    actors: [],
    directors: [],
    following: []
  };
  // console.log(req.params.id, 'req id');

  // var isFavorite = function(id) {
  //   for (var k = 0; k < favorites.length; k++) {
  //     if (id === favorites[k]) {
  //       console.log('Favorite True');
  //       return true;
  //     }
  //   }
  //   console.log('Favorite False');
  //   return false;
  // };
  // console.log(req, ‘sess’);
  // //ID is the ID corresponding to the Postgres ID Index for the User
  // var insertID = 1;
  // if (req.session.passport.user) {
  //   insertID = req.session.passport.user;
  // } else if (req.params.id) {
  //   insertID = req.params.id;
  // }
  //  console.log(req, ‘sess’);

   models.Profile.where({ id: user_id }).fetch()
     .then(profile => {
      if (!profile) {
        throw profile;
      }
      // console.log(favoritesObj, 'Pre');
      let attr = profile.attributes;
      // console.log(profile.attributes, attr, 'Attributes');
      favoritesObj.favorites = attr.favorites;
      if (attr.follow_genre) {
        for (var a = 0; a < attr.follow_genre.length; a++) {
          favoritesObj.genres.push(attr.follow_genre[a].id);
        }
      } else if (attr.follow_actor) {
        for (var b = 0; b < attr.follow_actor.length; b++) {
          favoritesObj.actors.push(attr.follow_actor[b].id);
        }
      } else if (attr.follow_director) {
        for (var c = 0; c < attr.follow_director.length; c++) {
          favoritesObj.directors.push(attr.follow_director[c].id);
        }
      }
      // console.log(favoritesObj, 'Post');

      models.Movies.fetchAll()
        .then(movies => {
          // console.log(movies, 'DB Model Movies Fetched');
          recAlgorithm(favoritesObj, movies, (err, results) => {
            if (err) {
              console.log(err, 'Alg Err');
              // res.status(500).send(err);
              callback(err);
            } else {
              console.log(results, 'Results');
              // res.status(201).send(results);
              callback(null, results);
            }
          });
        })
        .error(err => {
          console.log('Server Controller get all Movies - Error Caught');
          callback(err);
        });

    })
    .error(err => {
      // res.status(500).send(err);
      callback(err);
    })
    .catch((err) => {
      console.log(err, 'Big Error Caught');
      callback(err);
    });
};

var recAlgorithm = function(favorites, allMovies, callback) {
  // console.log(favorites, 'Favorites Received');
  // console.log(allMovies, 'all Movies');
  console.log(allMovies.length, 'Movie Number');

  var isFavorite = function(id) {
    for (var k = 0; k < favorites.length; k++) {
      if (id === favorites[k]) {
        // console.log('True');
        return true;
      }
    }
    // console.log('False');
    return false;
  };

  var ratedMovies = allMovies.map((movie) => {
    let mov = movie.attributes;
    // console.log(Object.keys(mov), 'movie');
    // console.log(mongo_id, 'mov split');
    if (isFavorite(mov.mongo_id)) {
      return null;
    }

    let actorFactor = 0;
    let directorFactor = 0;
    let genreFactor = 0;
    // console.log(mov, mov.actors.length, 'movie actors');
    // console.log(favorites.actors, 'fav');
    // Increase Rating Factor is Actor is a Favorite
    for (let j = 0; j < mov.actors.length; j++) {
      for (let i = 0; i < favorites.actors.length; i++) {
        // console.log('Compare IDs: ', mov.actors[j], favorites.actors[i]);
        let actorId = parseFloat(favorites.actors[i]);
        if (mov.actors[j] === actorId) {
          actorFactor++;
          console.log(actorFactor, 'Increase Factor Actor');
        }
      }
    }

    //Increase Rating Factor for Director
    for (let j = 0; j < mov.director.length; j++) {
      for (let i = 0; i < favorites.directors.length; i++) {
        // console.log('Compare IDs: ', mov.director[j], favorites.directors[i]);
        let directId = parseFloat(favorites.directors[i]);
        if (mov.director[j] === directId) {
          directorFactor++;
          console.log(directorFactor, 'Increase Factor Director');
        }
      }
    }


    for (let j = 0; j < mov.genres.length; j++) {
      for (let i = 0; i < favorites.genres.length; i++) {
        // console.log('Compare IDs: ', mov.genres[j], favorites.genres[i]);
        let directId = parseFloat(favorites.genres[i]);
        if (mov.genres[j] === directId) {
          genreFactor++;
          console.log(genreFactor, 'Increase Factor Genre');
        }
      }
    }

    console.log(mov.title, mov.ratings[0], 'Ratings');
    let imbd = parseFloat((mov.ratings[0].Value).slice(0, 3));
    // console.log(imbd, 'IMBD Rating');
    let rating = imbd + actorFactor + directorFactor + genreFactor;
    mov.algRating = rating;
    console.log(mov.title, mov.algRating, 'Movie Rating');
    return mov;
  });
  // console.log(ratedMovies, 'ratedMovies');
  console.log(ratedMovies.length, '# ratedMovies');

  let filteredMovies = ratedMovies.sort(function(a, b) {
    return b.algRating - a.algRating;
  });

  var recommendedMovies = filteredMovies.slice(0, 10);

  var movieRatingID = recommendedMovies.map((movie) => {
    // newMovie = {
    //   mongo_id: JSON.parse(movie.mongo_id),
    //   algRating: movie.algRating
    // };
    newMovie = JSON.parse(movie.mongo_id);
    return newMovie;
  });

  console.log(recommendedMovies.length, 'Total Recommendations');
  // callback(null, recommendedMovies);

  // console.log(movieRatingID, 'Just ID Ratings');
  callback(null, movieRatingID);
  //no error catch code anywhere
};


module.exports.getAllMovies = (req, res) => {
  models.Movies.fetchAll()
    .then(movies => {
      // console.log(movies, 'DB Model Movies Fetched');
    })
    .error(err => {
      console.log('Server Controller Movies - Error Caught');
    });
};
