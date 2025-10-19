import { Sequelize } from 'sequelize';

if (!process.env.DB_URL) {
  throw new Error('[DB] DATABASE_URL environment variable is not set.');
}

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: true
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('[DB] Connection has been established successfully.');
  } catch (error) {
    console.error('[DB] Unable to connect to the database:', error);
  }
};

export default sequelize;