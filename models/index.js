const User = require("./User.js");
const Exercise = require("./Exercise.js");
const Workout = require("./Workout.js");
const WorkoutExercises = require("./WorkoutExercises.js");

// User has many Workouts
User.hasMany(Workout, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
// Workouts belong to Users
Workout.belongsTo(User, {
  foreignKey: "userId",
});
// Workouts belong to many Exercises through WorkoutExercises, fk = workout_id
Workout.belongsToMany(Exercise, { through: "workoutexercises", foreignKey: "workout_id", timestamps: false });
// Exercises belong to many Workouts through WorkoutExercises fk = exercise_id
Exercise.belongsToMany(Workout, { through: "workoutexercises", foreignKey: "exercise_id", timestamps: false });
// See ERD for visual relationship data: #19

module.exports = {
  User,
  Workout,
  Exercise,
  WorkoutExercises,
};
