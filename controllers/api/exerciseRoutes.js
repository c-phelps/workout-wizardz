const router = require("express").Router();
const { Exercise } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll();

    const muscleGroups = exerciseData.map((exe) => exe.MuscleGroup);

    const uniqueGroups = muscleGroups.filter((val, i, arr) => {
      return arr.indexOf(val) === i;
    });

    res.render("exercise", {
      muscleGroups: uniqueGroups,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
