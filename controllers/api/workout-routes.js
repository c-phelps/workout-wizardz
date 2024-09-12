const express = require("express");
const router = express.Router();
const { User, Workout, WorkoutExercises, Exercise } = require("../../models");
const dayjs = require("dayjs");

router.get("/", async (req, res) => {
  try {
    const user_id = req.session.user_id;

    const userData = await User.findOne({ where: { id: user_id } });
    // deconstruct the id from the userData
    const { username } = userData.get({ plain: true });

    // find all workouts and associated exercises where the user_id matches the current user
    const workoutData = await Workout.findAll({
      include: [{ model: Exercise, as: "exercises" }],
      where: {
        user_id: user_id,
      },
      order: [["date", "ASC"]],
    });
    // map the array of workout data to plain readable data
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));
    // render the workout page with the workouts and user_name
    res.render("workout", { workouts, user: username });
    // res.json(workouts);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ error: "An error occurred while fetching workouts" });
  }
});

// find a specific workout and include exercise data for that workout
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

// update by workout/workoutid/exercise/exerciseid
router.put("/:workoutId/exercise/:exerciseId", async (req, res) => {
  const { workoutId, exerciseId } = req.params;
  const { notes } = req.body;

  try {
    const workoutExercises = await WorkoutExercises.findOne({
      where: {
        workout_id: parseInt(workoutId),
        exercise_id: parseInt(exerciseId),
      },
    });

    if (!workoutExercises) {
      return res.status(404).json({ error: `Workout not found: wo${workoutId} ex${exerciseId}` });
    }

    await workoutExercises.update({ notes });

    res.json({ message: "Workout updated successfully" });
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ error: "An error occurred while updating the workout" });
  }
});

// delete specific excercise from a workout/id pair
router.delete("/:workoutId/exercise/:exerciseId", async (req, res) => {
  const { workoutId, exerciseId } = req.params;
  try {
    // attempt to destroy the value in the junction table with both of the id key
    const deleted = await WorkoutExercises.destroy({
      where: {
        workout_id: parseInt(workoutId),
        exercise_id: parseInt(exerciseId),
      },
    });

    res.json({ message: "Record deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while deleting the exercise" });
  }
});

// pretty much copy pasted code from above to relate to a specific workout rather than a workout/id pair
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    // attempt to destroy the value in the workout table by id
    const deleted = await Workout.destroy({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: "Record deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while deleting the exercise" });
  }
});

// workout creation
router.post("/", async (req, res) => {
  try {
    // retrieve the date and array of selected exercises
    const { date, exercises } = req.body;
    const formattedDate = dayjs(date).format("MM/DD/YYYY");
    const user_id = req.session.user_id;
    const newWorkout = await Workout.create({
      date: formattedDate,
      user_id: user_id,
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
