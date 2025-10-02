const router = require('express').Router();
let Profile = require('../models/profile.js');

router.route('/').get((req, res) => {
  Profile.findOne()
    .then(profile => res.json(profile))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
  Profile.findOne()
    .then(profile => {
      if (!profile) {
        profile = new Profile();
      }
      profile.name = req.body.name;
      profile.description = req.body.description;

      profile.save()
        .then(() => res.json({
          message: 'Profile updated!',
        }))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;