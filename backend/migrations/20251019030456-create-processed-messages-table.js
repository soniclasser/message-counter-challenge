module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('processed_messages', {
      message_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      account_id: { type: Sequelize.STRING, allowNull: false },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('processed_messages');
  }
};