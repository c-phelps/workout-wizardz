// Import necessary modules
const sequelize = require('../config/connection');
const { exerciseData} = require('../models');

const exerciseData = require('./exerciseData.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(exerciseData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
