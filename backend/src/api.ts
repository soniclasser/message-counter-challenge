import 'reflect-metadata';
import { container } from 'tsyringe';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './config/config';
import { RabbitMQService } from './services/RabbitMQService';
import { createRouter } from './routes/index';

const startAPI = async () => {
  await connectDB();

  const rabbitMQService = container.resolve(RabbitMQService);
  await rabbitMQService.connect();

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use('/api/v1', createRouter());

  app.listen(PORT, () => {
    console.log(`[API] Server listening on port ${PORT}`);
  });
};

startAPI().catch(err => {
  console.error('Error starting API service:', err);
  process.exit(1);
});
