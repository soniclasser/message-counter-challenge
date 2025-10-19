module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hourly_counts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_id: { type: Sequelize.STRING, allowNull: false },
      rounded_hour: { type: Sequelize.DATE, allowNull: false },
      message_count: { type: Sequelize.INTEGER, defaultValue: 0 },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    });

    await queryInterface.addConstraint('hourly_counts', {
      fields: ['account_id', 'rounded_hour'],
      type: 'unique',
      name: 'hourly_counts_unique_account_hour'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hourly_counts');
  }
};