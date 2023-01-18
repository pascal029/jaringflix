'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  
    const genres = require('../data/db.json').Genre
      .map(el => {
        return {
          ...el,
          createdAt : new Date(),
          updatedAt : new Date()
        }
      })
    await queryInterface.bulkInsert('Genres', genres, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Genres', null, {})
  }
};
