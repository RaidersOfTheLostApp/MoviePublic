const models = require('../../db/models');

module.exports.saveFavorites = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      var subs = [];
      for (var key in req.body) {
        if (req.body[key]) {
          subs.push(req.body[key]);
        }
      }
      return profile.save({favorites: JSON.stringify(subs)}, {patch: true});
    })
    .then(() => {
      console.log('********* favorites have successfully been saved to DB');
      res.sendStatus(201);
    })
    .error(err => {
      console.log('********* error in saving favorites to DB', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in setFavorites', e);
      res.sendStatus(404);
    });
};
