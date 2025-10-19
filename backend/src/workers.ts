import 'reflect-metadata';
import { container } from 'tsyringe';
import * as dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/config';
import { RabbitMQService } from './services/RabbitMQService';
import { WorkerService } from './services/WorkerService';

const startWorker = async () => {
  await connectDB();

  const rabbitMQService = container.resolve(RabbitMQService);
  await rabbitMQService.connect();

  const workerService = container.resolve(WorkerService);
  await workerService.consumeMessages();

  console.log('[Worker] Servicio de consumo iniciado. Esperando eventos...');
};

startWorker().catch(err => {
  console.error('Error al iniciar el servicio Worker:', err);
  process.exit(1);
});
