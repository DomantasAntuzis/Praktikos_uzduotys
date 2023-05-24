'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('operacijos', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      produkto_id: { type: Sequelize.INTEGER, allowNull: false },
      date: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      kiekis: { type: Sequelize.INTEGER },
      kaina: { type: Sequelize.DECIMAL(10, 2) },
      suma: { type: Sequelize.DECIMAL(10, 2) }
    });

    await queryInterface.createTable('produktai', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      pavadinimas: { type: Sequelize.STRING(255), allowNull: false },
      aprasymas: { type: Sequelize.STRING(255) },
      pirkimo_suma: { type: Sequelize.DECIMAL(10, 2) },
      pardavimo_suma: { type: Sequelize.DECIMAL(10, 2) },
      likutis: { type: Sequelize.INTEGER }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('operacijos');
    await queryInterface.dropTable('produktai');
  }
};
