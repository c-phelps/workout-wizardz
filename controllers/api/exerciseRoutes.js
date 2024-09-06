const router = require('express').Router();
const { Exercise } = require('../../models');
const withAuth = require('../utils/auth');

router.post('/', async (req, res) => {
    try{
        const exerciseData = await Exercise.findAll({
            include: [
                {
                    model: Exercise,
                    attributes: ['name'],
                },
            ],
        });
        const exercises = exerciseData.map((exercise) => exercise.get({plain: true}));
        res.render('homepage', {
            exercises,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/exercise/:id', async (req, res) => {
    try {
      const exerciseData = await Exercise.findByPk(req.params.id, {
        include: [
          {
            model: Exercise,
            attributes: ['name'],
          },
        ],
      });
  
      const exercise = exerciseData.get({ plain: true });
  
      res.render('exercise', {
        ...exercise,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
  