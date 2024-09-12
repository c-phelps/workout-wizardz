const router = require("express").Router();
const { Exercise } = require("../../models");

// find all of the musclegroups to return an array of unique musclegroups
router.get("/", async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll();

    const muscleGroups = exerciseData.map((exe) => exe.MuscleGroup);

    const uniqueGroups = muscleGroups.filter((val, i, arr) => {
      return arr.indexOf(val) === i;
    });
    
    // render exercise with the array of unique musclegroups and the boolean that determines if user is logged in
    res.render("exercise", {
      muscleGroups: uniqueGroups,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// find all of the exercises for the selected muscle-group
router.get("/group/:muscleGroup", async (req, res) => {
  try {
    const { muscleGroup } = req.params;
    const exerciseData = await Exercise.findAll({
      where: { MuscleGroup: muscleGroup },
    });
    res.json(exerciseData.map((exe) => exe.get({ plain: true })));
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single exercise where the name = the passed value
router.get("/:exercise", async (req, res) => {
  try {
    const { exercise } = req.params;
    const exerciseData = await Exercise.findOne({
      where: { Name: exercise },
    });
    res.json(exerciseData.get({ plain: true }));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
