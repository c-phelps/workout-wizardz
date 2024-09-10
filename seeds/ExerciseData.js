// Import necessary modules
const sequelize = require("../config/connections");
const { Exercise, User } = require("../models");

const exerciseData = require("./exercise.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Exercise.bulkCreate(exerciseData, {
    individualHooks: true,
    returning: true,
  });

  // REMOVE TEST USER ONCE WE HAVE ACTUAL LOGIN
  const userData = [
    {
      username: "testuser",
      password: "12345678",
    },
  ];
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
