const router = require('express').Router();
const { Exercise } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const exerciseData = await Exercise.findAll({group: 'musclegroup'});
  
      const exercise = exerciseData.map((exe) => exe.get({ plain: true }));
  
      res.render('exercise', {
        ...exercise,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;