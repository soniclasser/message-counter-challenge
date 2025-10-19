import * as dotenv from 'dotenv';
import { Options } from 'sequelize'; 

interface SequelizeCliConfig extends Options {
  url: string;
  dialect: 'postgres';
  migrationStorageTableName?: string;
}

dotenv.config();

const config: { [env: string]: SequelizeCliConfig } = {
  development: {
    url: process.env.DB_URL!, 
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
  },
  
  production: {
    url: process.env.DB_URL!, 
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
    logging: false,
  },
};

export default config;