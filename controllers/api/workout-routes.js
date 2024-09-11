const express = require("express");
const router = express.Router();
const { User, Workout, WorkoutExercises, Exercise } = require("../../models");
const dayjs = require("dayjs");

router.get("/", async (req, res) => {
  try {
    // const user_name = req.session.user_id; //
    const user_name = "testuser"; //
    // ---------------------------------------------------------
    // find the ID for the user based off of the name
    const userData = await User.findOne({ where: { username: user_name } });
    const { id } = userData.get({ plain: true });

    const workoutData = await Workout.findAll({
      include: [{ model: Exercise, as: "exercises" }],
      where: {
        user_id: id,
      },
    });
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));
    res.render("workout", { workouts, user: user_name });
    // res.json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ error: "An error occurred while fetching workouts" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findByPk(id, {
      include: [{ model: Exercise, as: "exercises" }],
    });

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json(workout);
  } catch (error) {
    console.error("Error fetching workout:", error);
    res.status(500).json({ error: "An error occurred while fetching the workout" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedWorkoutData = req.body;

  try {
    const workout = await Workout.findByPk(id);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    await workout.update(updatedWorkoutData);

    res.json({ message: "Workout updated successfully" });
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ error: "An error occurred while updating the workout" });
  }
});

// workout creation
router.post("/", async (req, res) => {
  try {
    // retrieve the date and array of selected exercises
    const { date, exercises } = req.body;
    const formattedDate = dayjs(date).format("MM/DD/YYYY");
    // set the username to the logged in user - test user for testing data
    // ---------------------------------------------------------
    // const user_name = req.session.user_id; //
    const user_name = "testuser"; //
    // ---------------------------------------------------------
    // find the ID for the user based off of the name
    const userData = await User.findOne({ where: { username: user_name } });
    const { id } = userData.get({ plain: true });
    // create a new workout with the information:
    // date from date/time picker
    // user from current user
    // USE TEST USER UNTIL WE HAVE LOGIN THEN REVERT
    const newWorkout = await Workout.create({
      date: formattedDate,
      user_id: id,
    });
    const exerciseIdsArray = [];
    // loop through exercises and each current exercise will be exercise
    for (const exercise of exercises) {
      // find exactly one exercise where Name = current exercise
      const exerciseData = await Exercise.findOne({ where: { Name: exercise } });
      // retrieve the id as plain data and destructure it
      const { id } = exerciseData.get({ plain: true });
      // push the values to the array of ids if exercise is not duplicated
      if (!exerciseIdsArray.includes(id)) {
        exerciseIdsArray.push(id);
      }
    }
    // if exercisesIdsArray exists and has values,
    // create associated exercises in the junction table
    if (exerciseIdsArray.length > 0) {
      await newWorkout.addExercises(exerciseIdsArray); //add exercises should add these records to the workoutexercises table
    }

    res.status(201).json(newWorkout);
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ error: "An error occurred while creating the workout" });
  }
});

module.exports = router;
