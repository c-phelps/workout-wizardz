// Import necessary modules
const { queryInterface, Sequelize } = require('sequelize'); // Example with Sequelize
const db = require('../models'); // Import your models if needed

module.exports = {
  up: async () => {
    // Seed data logic
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Alice Smith',
        email: 'alice@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
  down: async () => {
    // Logic to revert the seeding
    await queryInterface.bulkDelete('Users', null, {});
  },
};

