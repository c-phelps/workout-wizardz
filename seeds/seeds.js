const sequelize = require('../config/connections');
const { Exercise } = require('../models');

const exerciseData = require('./exercise.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Exercise.bulkCreate(exerciseData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();