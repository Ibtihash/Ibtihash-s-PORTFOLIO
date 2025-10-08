
const router = require('express').Router();
let Skill = require('../models/skill.js');

router.route('/').get((req, res) => {
  Skill.find()
    .then(skills => res.json(skills))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const logo = req.body.logo;

  const newSkill = new Skill({
    name,
    logo,
  });

  newSkill.save()
    .then(() => res.json('Skill added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Skill.findById(req.params.id)
    .then(skill => res.json(skill))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Skill.findByIdAndDelete(req.params.id)
    .then(() => res.json('Skill deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Skill.findById(req.params.id)
    .then(skill => {
      skill.name = req.body.name;
      skill.logo = req.body.logo;

      skill.save()
        .then(() => res.json('Skill updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
